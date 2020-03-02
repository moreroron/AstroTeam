import React from 'react'

const UserItem = (props) => {
    const { user } = props;

    return (
        <div className="column">
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="placeholder" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-5">{user.username}</p>
                            <p className="subtitle is-7">{user.email}, {user.country}</p>
                        </div>
                    </div>

                    <div className="content">
                        <p className="">Tasks Opened: {user.tasks.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserItem

