//
import Model from '../Model';
//
import MsgEntity from '../MsgEntity';

// Action(s)
import {
    msgAdd
} from '../../actions/msg';

/**
 * @class MsgModel
 */
export default class MsgModel extends Model
{
    /**
     * @var {String} redux store::state key
     */
    _stateKeyName = 'msgs';

    /**
     * @var {Ref}
     */
    _entity = MsgEntity;

    /**
     * 
     * @param {object} data
     */
    constructor(data)
    {
        super(data);
    }

    /**
     * 
     */
    create(data = {})
    {
        // Validate data?!
        if (!data.tel) {
            throw new Error('Data `tel` is required!');
        }
        if (!data.content) {
            throw new Error('Data `content` is required!');
        }
        // Init
        // +++
        if (!data.date) {
            data.date = new Date();
        }

        //
        let msgEnt = new MsgEntity(data);
        this._store.dispatch(msgAdd(msgEnt));
    }
}