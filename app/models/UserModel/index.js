//
import Model from '../Model';
//
import UserEntity from '../UserEntity';

/**
 * @class UserModel
 */
export default class UserModel extends Model
{
    /**
     * @var {String} redux store::state key
     */
    _stateKeyName = 'users';

    /**
     * @var {Ref}
     */
    _entity = UserEntity;

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
        var opts = Object.assign({}, _opts);
        //
        let dataList = super.dataList();
        // +++ Include 'Favorites'?
        if (opts.favorite/* && (dataList instanceof Array)*/) {
            dataList = ([
                new UserEntity({
                    first_name: 'Favorites',
                    last_name: 'Favorites',
                    tel: 'Favorites',
                    favorite: true,
                })
            ]).concat(dataList);
        }

        // Filter?
        let filters = _opts.filters || {};
        // ---
        if (Object.keys(filters).length) {
            dataList = dataList.filter((item, idx) => {
                let rtn = true;
                // Filter by: fullname or tel?
                if (filters.fullname_or_tel) {
                    rtn = false;
                    let fnOrTelLC = filters.fullname_or_tel.toString().toLowerCase();
                    let fnLC = item.fullname().toString().toLowerCase();
                    let telLC = item.tel.toString().toLowerCase();
                    if ((fnLC.indexOf(fnOrTelLC) >= 0)
                        || (telLC.indexOf(fnOrTelLC) >= 0)
                    ) {
                        rtn = true;
                    }
                    // console.log('fnLC: ', fnLC, fnLC.indexOf(fnOrTelLC));
                    // console.log('telLC: ', telLC, telLC.indexOf(fnOrTelLC));
                    // console.log('rtn: ', rtn);
                }
                return rtn;
            });
        }
        //.end

        // Return
        return dataList;
    }
}