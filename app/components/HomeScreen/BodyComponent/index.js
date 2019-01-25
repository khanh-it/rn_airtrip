/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  View,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Css
import styles from './styles';

// Component(s)
import MsgComponent from '../MsgComponent';

// Model(s)
import MsgListModel from '../../../models/MsgListModel';

/**
 * @class BodyComponent
 */
export default class BodyComponent extends PureComponent
{
  constructor(props)
  {
    super(props);
    // console.log('VC props: ', props);

    // Init model(s)
    this.msgListModel = new MsgListModel();

    // Init state
    this.state = {
      title: {},
      syncText: $g.Lang('Turn on sync with Cloud to sync messages >'),
      searching: false,
      //
      contactsWithLatestMsgs: []
    };

    // Bind method(s)
  }

  componentDidMount()
  {
    // Get data --> trigger re-render...
    this.setState((state) => ({
      contactsWithLatestMsgs: this.msgListModel.getContactsWithLatestMsgs()
    }));
  }

  _formatMsgDataList(dataList)
  {
    let sections = {
      
    };
  }

  _renderSync()
  {
    let {
      syncText
    } = this.state;

    return (
      <View style={[ESS.value('$p20'), styles.sync]}>
        <Text style={[ESS.value('$textCenter'), styles.syncText]}>
          {syncText}
        </Text>
      </View>
    );
  }

  _renderMsgList()
  {
    let {
      contactsWithLatestMsgs: dataList
    } = this.state;
    let headerYesterday = null;
    let headerToday = null;
    let headerOthers = null;
    return (
      <View style={[ESS.value('$floating'), styles.msgList]}>
        {/* <Button title="Set data 'msg'" onPress={() => { this.props.setMsgs(); }} />
        <Button title="Set data 'users'" onPress={() => { this.props.setUsers(); }} /> */}
        <FlatList
          style={[styles.msgListBox]}
          data={dataList}
          extraData={this.state}
          keyExtractor={(contact) => contact.tel}
          renderItem={({ item: contact, index }) => {
            let msg = ((contact && contact._msgs) || [])[0];
            if (!msg) {
              return;
            }
            let header = null;
            if (!contact.favorite) {
              if (msg.dateIsToday() && !headerToday) {
                headerToday = header = $g.Lang('TODAY');
              } else if (msg.dateIsYesterday() && !headerYesterday) {
                headerYesterday = header = $g.Lang('YESTERDAY');
              } else {
                if (!headerOthers) {
                  headerOthers = header = $g.Lang('OTHER');
                }
              }
            }
            return (
              <MsgComponent
                header={header}
                title={contact.fullname()}
                date={msg.dateAsStr()}
                content={msg.content}
              />
            );
          }}
          removeClippedSubviews={true}
        />
        {/* Msg list box */}
        {/* <View style={[styles.msgListBox]}>
          <MsgComponent
            title={'Favorites'}
            date={new Date()}
            content={'TK 1250###'}
          />

          <MsgComponent
            header="TODAY"
            title={'Mom_Home'}
            date={new Date()}
            content={'TODAY 001'}
          />
          <MsgComponent
            title={'Mom_Home'}
            date={new Date()}
            content={'TODAY 002'}
          />

          <MsgComponent
            header="YESTERDAY"
            title={'Mom_Home'}
            date={new Date()}
            content={'YESTERDAY 001'}
          />
          <MsgComponent
            title={'Mom_Home'}
            date={new Date()}
            content={'YESTERDAY 002'}
          />

          <MsgComponent
            header="EARLIER"
            title={'SCB'}
            date={new Date()}
            content={'EARLIER 001'}
          />
          <MsgComponent
            title={'Vk iu cute'}
            date={new Date()}
            content={'EARLIER 002'}
          />
          <MsgComponent
            title={'Dong A Bank'}
            date={new Date()}
            content={'EARLIER 003'}
          />
          <MsgComponent
            title={'PA VietNam'}
            date={new Date()}
            content={'EARLIER 004'}
          />
        </View> */}
        {/* .end#Msg list box */}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.root]}>
      {/* Turn sync */}
        {this._renderSync()}
      {/* .end#Turn sync */}
      {/* Msg list */}
        {this._renderMsgList()}
      {/* .end#Msg list */}
      </View>
    );
  }
}
