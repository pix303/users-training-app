import type { NextApiRequest, NextApiResponse } from 'next'
import { UserResponse } from '../../shared/model/user-response';
import { addUser } from '../../shared/user.server'


export default async function addUserHandler(req: NextApiRequest, res: NextApiResponse<UserResponse>): Promise<any> {
    const id = req.body.id;
    console.log(req.url);
    console.log(req.query);


    const result = await addUser(req.body);
    if (!result.isError) {
        res.status(200).redirect(`/user-detail/${result.value}/info`);
    } else {
        res.status(500).redirect(`/user-detail-edit/${id}?error=${result.message}`);
    }
}