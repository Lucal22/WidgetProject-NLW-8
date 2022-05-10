import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import { Options } from '../Options';
import { Form } from '../Form';


import { feedbackTypes } from '../../utils/feedbackTypes';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes ;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeebackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen(){
    bottomSheetRef.current?.expand();
  }

  function handleRestart(){
    setFeedbackType(null);
    setFeebackSent(false);
  }
  
  function handleFeedbackSent(){
    setFeebackSent(true);
  }
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen }
      >
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
      snapPoints={[1, 280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent?
          <Success
          onSendAnotherFeedback = {handleRestart}
          />
          :
          <>
          
          {feedbackType?
          <Form 
          feedbackType={feedbackType}
          onFeedbackCanceled={handleRestart}
          onFeedbackSent = {handleFeedbackSent}
          />
          :
          <Options
          onFeedbackTypeChanged={setFeedbackType}
          />
        }
        
          </>
        }
        

    </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);