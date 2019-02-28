/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  View
} from 'react-native';
import {
  VectorIcon
} from 'react-native-my';

/**
 * @class CheckmarkComponent
 */
export default class CheckmarkComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Init model(s)

    // Init state
    this.state = {
      selected: !!props.selected
    };

    // Bind method(s)
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  /**
   * 
   * @param {Boolean} selected
   * @return {void}
   */
  toggleSelection(_selected)
  {
    let selected = _selected;
    if (typeof selected != 'boolean') {
      selected = !this.state.selected;
    }
    // this.setState({ selected });
    console.log('selected: ', selected, _selected);
    if (selected) {
      this._refYes.setNativeProps(ESS.value('$unhidden'));
      this._refNo.setNativeProps(ESS.value('$hidden'));
    } else {
      this._refYes.setNativeProps(ESS.value('$hidden'));
      this._refNo.setNativeProps(ESS.value('$unhidden'));
    }
  }

  render() {
    let {
      selected
    } = this.state;
    //
    let { selected: slt, ...props } = this.props;

    return (
      <View>
        <View
          ref={ref => { return this._refYes = ref; }}
          // style={[selected ? null : ESS.value('$hidden')]}
        >
          <VectorIcon
            Icon={Ionicon}
            name='ios-radio-button-off'
            {...props}
          />
        </View>
        <View
          ref={ref => { return this._refNo = ref; }}
          // style={[selected ? ESS.value('$hidden') : null]}
        >
          <VectorIcon
            Icon={Ionicon}
            name='ios-radio-button-on'
            {...props}
          />
        </View>
      </View>
    );
  }
}
