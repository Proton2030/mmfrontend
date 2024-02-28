import React from 'react';
import { Menu } from 'react-native-paper';

export const ChatMenu = ({ visible, onDismiss, anchor,options,style }:any) => {
    return (
        <Menu
            visible={visible}
            onDismiss={onDismiss}
            anchor={anchor}
            style={{backgroundColor:"transparent"}}
            contentStyle={style}
           
        >
            {options.map((option: any, index: number) => (
                <Menu.Item key={index} onPress={option.onPress} title={option.title} leadingIcon={option.icon} />
            ))}
        </Menu>
    );
};


