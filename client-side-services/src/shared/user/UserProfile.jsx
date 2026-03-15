import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../../store/api/authApi'

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)

    const { data, isLoading, error } = useGetUserQuery(user?._id)

    console.log("api data:", data)

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading user</p>}

            {data && (
                <>
                    <h2>{data?.name}</h2>
                    <p>{data?.email}</p>
                </>
            )}
        </div>
    )
}

export default UserProfile