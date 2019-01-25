//
import Model from '../Model';
//
import MsgEntity from '../MsgEntity';

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
}