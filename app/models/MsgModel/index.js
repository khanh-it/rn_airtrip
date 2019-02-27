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

    dataList(_opts = {})
    {
        // Get, format input(s)
        let opts = Object.assign({}, _opts);
        // +++
        let { filters = {} } = opts;

        // Fetch data
        let dataList = super.dataList();

        // Filter?
        if (Object.keys(filters).length) {
            dataList = dataList.filter((msgEnt, idx) => {
                let result = true;
                if (filters.tel) {
                    result = msgEnt.isTelMatched(filters.tel);
                    console.log("result: ", result, filters.tel);
                }
                return result;
            });
        }

        // Return
        return dataList;
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