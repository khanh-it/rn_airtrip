/**
 * 
 */
import React from 'react';
import { Platform } from 'react-native';

/**
 * @class VectorIcon
 */
function VectorIcon(props)
{
    let { name, nameIos, nameAndroid, Icon, ..._props } = props;
    if (!name) {
        if ((Platform.OS === 'ios') && nameIos) {
            name = nameIos    
        }
        if ((Platform.OS === 'android') && nameAndroid) {
            name = nameAndroid    
        }
    }
    return <Icon name={name} {..._props} />
}
export default VectorIcon;

