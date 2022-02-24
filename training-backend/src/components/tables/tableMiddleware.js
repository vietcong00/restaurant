import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';
import { TABLE_ATTRIBUTES } from './tableConstant';

const db = require('../../models');

export async function checkExistTable(req, res, next) {
    try {
        const { id } = req.params;
        const table = await db.Table.findByPk(id, {
            attributes: TABLE_ATTRIBUTES,
            raw: true,
        });
        if (!table) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('table.check.TableNotExist'), {}));
        }
        req.tableData = table;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
