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
        if (opts.favorite && (dataList instanceof Array)) {
            dataList = ([
                new UserEntity({
                    first_name: 'Favorites',
                    last_name: 'Favorites',
                    tel: 'Favorites',
                    favorite: true,
                })
            ]).concat(dataList);
        }
        // Return
        return dataList;
    }
}