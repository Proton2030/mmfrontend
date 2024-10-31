import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';
import { Button, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../../globalStyles/GlobalStyles';

export interface SelectFieldProps extends Omit<TextInputProps, 'ref' | 'onValueChange' | 'onChange' | 'value'> {
  value?: string[];
  label?: string;
  renderValue?: (value: string[]) => string;
  onSelect?: (newValue: string[]) => void;
  multiple?: boolean;
  options: { label: string; value: string }[];
}
export interface SelectFieldRef {
  presentOptions: () => void;
  dismissOptions: () => void;
}

export const SelectField = forwardRef(function SelectField(props: SelectFieldProps, ref: Ref<SelectFieldRef>) {
  const { value = [], onSelect, renderValue, options = [], label, multiple = true, ...TextFieldProps } = props;
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const { colors } = useTheme();

  const handleOpenBottomSheet = () => {
    // setOpenBottomSheet(true);
  };

  const valueString =
    renderValue?.(value) ??
    value
      .map((v) => options.find((o) => o.value === v)?.label || '') // Default to empty string if label is undefined
      .filter((label) => typeof label === 'string' && label.length > 0)
      .join(', ');

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handleOpenBottomSheet}>
        <View pointerEvents="none">
          <TextInput
            // {...TextFieldProps}
            textColor={colors.scrim}
            style={globalStyles.roundedInputBox}
            mode="outlined"
            label={label}
            value={valueString}
            right={<TextInput.Icon icon={'chevron-down'} style={{ marginTop: 15 }} />}
          />
        </View>
      </TouchableOpacity>
    </>
  );
});
