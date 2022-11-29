import type { NextApiRequest, NextApiResponse } from 'next'
import { UserResponse } from '../../shared/model/user-response';
import { addUser } from '../../shared/user.server'


export default async function addUserHandler(req: NextApiRequest, res: NextApiResponse<UserResponse>): Promise<any> {
    let result;
    try {
        result = await addUser(req.body);
        res.status(200).redirect(`/user-detail/${result.value}/info`)
    } catch (error: any) {
        console.log(error);
        res.status(500).send(result ?? { message: error.toString() });
    }

}