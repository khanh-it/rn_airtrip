//
import Model from '../Model';
//
import UserModel from '../UserModel';
import MsgModel from '../MsgModel';

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
      let dLstUser = this._userModel.dataList({
        favorite: true
      });
      let dLstMsg = this._msgModel.dataList();
      let contacts = dLstUser.map((userEnt, idx1st) => {
        let msgs = [];
        let lastMsgDate = null;
        dLstMsg.forEach((msgEnt, idx2nd) => {
          //
          if (((msgEnt.tel == userEnt.tel)
              || (!msgEnt.favorite && userEnt.favorite)
            ) && (msgs.length < opts.msg_cnt)
          ) {
            if (!lastMsgDate || (msgEnt.date > lastMsgDate)) {
              msgs.push(msgEnt);
            }
            lastMsgDate = msgEnt.date;
          }
        });
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
    storeMsgData(data)
    {
      dispatch(msgAdd(data));
    }

    /**
     * 
     */
    markMsgRead(data)
    {
      dispatch(msgEdit(data));
    }

    /**
     * 
     */
    setMsgs(data)
    {
      dispatch(msgSet(data));
    }

    /**
     * 
     */
    setUsers(data)
    {
      dispatch(userSet(data));
    }
}