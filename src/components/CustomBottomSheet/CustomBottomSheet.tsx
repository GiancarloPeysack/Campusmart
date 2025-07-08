import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const CustomBottomSheet = forwardRef(({ children, height }, ref) => {
  const bottomSheetRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.open(),
    close: () => bottomSheetRef.current?.close(),
  }));

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={height ?? Dimensions.get('window').height / 2.12}
      useNativeDriver={false}
      customStyles={{
        container: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        wrapper: { backgroundColor: '#00000080' },
        draggableIcon: { backgroundColor: '#000' },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      draggable={false}
    >
      {children}
    </RBSheet>
  );
});

export default CustomBottomSheet;
