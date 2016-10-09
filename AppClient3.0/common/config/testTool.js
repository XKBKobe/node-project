import crypto from 'crypto';
import querystring from 'querystring';
import uuid from 'uuid';

const MD5_KEY = '3DQEBAQUAA4GNADCBiQKBgQCqWT3C34iIruDvDf86w8zP5cAv';

export function testEncryption(strParam) {
	var password = '';
	var md5 = crypto.createHash('md5');

	password = md5.update(MD5_KEY + strParam + MD5_KEY).digest('hex');

	return password;
}
