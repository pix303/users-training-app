import { GetServerSideProps, NextPage } from "next"
import { resolve } from "path";
import ErrorMessage from "../../components/error-message";
import { StatusOptions } from "../../shared/status-type"
import { User } from "../../shared/user"

type UserDetailProps = {
    status: StatusOptions.SUCCESS;
    user: User;
} | {
    status: StatusOptions.ERROR;
    errorMessage: string;
}

const UserDetail: NextPage<UserDetailProps> = (props: UserDetailProps) => {

    switch (props.status) {
        case StatusOptions.SUCCESS:
            return <p>{props.user.name}</p>
        case StatusOptions.ERROR:
            return <ErrorMessage message={props.errorMessage} info="test test test" />
    }
}

export default UserDetail;

export const getServerSideProps: GetServerSideProps<UserDetailProps> = async ({ params }) => {
    const id = params?.id;
    let _props: UserDetailProps;

    if (!id) {
        _props = { status: StatusOptions.ERROR, errorMessage: "id not present" };
        return { props: _props };
    }

    // const d = () => {
    //     return new Promise(resolve => setTimeout(resolve, 5000));
    // }

    try {
        //await d();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`);
        const data = await response.json();
        _props = { status: StatusOptions.SUCCESS, user: data };
    } catch (error) {
        _props = { status: StatusOptions.ERROR, errorMessage: "id not present" };
    }

    return { props: _props };
}