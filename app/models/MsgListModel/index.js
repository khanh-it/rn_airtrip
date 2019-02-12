//
import Model from '../Model';
//
import UserModel from '../UserModel';
import MsgModel from '../MsgModel';

import {
  msgSet
} from '../../actions/msg';
import {
  userSet
} from '../../actions/user';

/**
 * @class MsgListModel
 */
export default class MsgListModel extends Model
{
    /**
     * 
     * @param {object} data
     */
    constructor(data)
    {
      super(data);

      // Init model(s)
      this._userModel = new UserModel();
      this._msgModel = new MsgModel();
    }

    /**
     * Get contacts with it latest msg
     * @param {Object} opts Options
     * @returns Array
     */
    getContactsWithLatestMsgs(_opts = {})
    {
      // Get, format input(s)
      var opts = Object.assign({
        msg_cnt: 1
      }, _opts);
      // Do
      let dLstUser = this._userModel.dataList({ favorite: true });
      let dLstMsg = this._msgModel.dataList();
      let contacts = dLstUser.map((userEnt, idx1st) => {
        let lastMsgDate = null;
        let msgs = dLstMsg.filter((msgEnt, idx2nd) => {
          return (msgEnt.tel == userEnt.tel)
          || (/* @TODO: remove ! mark */!msgEnt.favorite && userEnt.favorite)
          ;
        });
        if (msgs.length) {
          msgs.sort(function(msg1, msg2) {
            return msg2._date() - msg1._date(); // latest first
          });
        }
        msgs = msgs.slice(0, opts.msg_cnt);
        let contact = Object.assign(userEnt, {
          _msgs: msgs
        });
        return contact;
      });
      return contacts;
    }

    /**
     * 
     */
    markMsgRead(data)
    {
      this._store.dispatch(msgEdit(data));
    }

    /**
     * 
     */
    setMsgs(data)
    {
      this._store.dispatch(msgSet(data));
    }

    /**
     * 
     */
    setUsers(data)
    {
      this._store.dispatch(userSet(data));
    }

    /**
     * Get latest used contact(s)
     * @param {Object} opts Options
     * @returns Array
     */
    getLatestUsedContacts(_opts = {})
    {
      // Get, format input(s)
      var opts = Object.assign({
        cnt: 10
      }, _opts);
      // Do
      let dLstUser = this._userModel.dataList();
      let contacts = [];
      for (let idx = 0; idx < opts.cnt; idx++) {
        contacts.push(dLstUser[idx]);
      }
      return contacts;
    }
}