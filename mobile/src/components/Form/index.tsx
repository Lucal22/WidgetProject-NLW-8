import React, {useState} from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity

} from 'react-native';
import { theme } from '../../theme';
import {captureScreen} from 'react-native-view-shot'
import { ArrowLeft } from 'phosphor-react-native';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import {FeedbackType} from '../Widget';
import {Button} from '../Button';
import {feedbackTypes} from '../../utils/feedbackTypes';
import {ScreenshotButton} from '../ScreenshotButton'
import { api } from '../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: ()=> void;
    onFeedbackSent: ()=> void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('')

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
        .catch(error=> console.log(error));
    }
    
    function handleScreenshotRemove(){
        setScreenshot(null)
    }

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return
        }
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try{
            await api.post('/feedbacks',{
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            });
            onFeedbackSent();
        }catch(e){
            console.log(e)
            setIsSendingFeedback(false)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                size={24}
                weight= 'bold'
                color={theme.colors.text_secondary}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image 
                source={feedbackTypeInfo.image}
                style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>
        <TextInput 
        multiline
        style={styles.input}
        placeholder= 'Algo não está funcionando bem? Deixe seu feedback.'
        placeholderTextColor={theme.colors.surface_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        />
        <View style={styles.footer}>
            <ScreenshotButton
            onTakeShot={handleScreenshot}
            onRemoveShot={handleScreenshotRemove}
            screenshot={screenshot}
            />
            <Button 
            isLoading= {isSendingFeedback}
            onPress={handleSendFeedback}
            />
        </View>
    </View>

  );
}