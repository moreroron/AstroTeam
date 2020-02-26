import React from 'react'

const Modal = ({ title, content, btnTitle, modalStatus, hideModal, handleSubmit }) => {

    // const modalVisability = modalStatus ? "is-active" : "";

    const modalBody = !modalStatus ? (<p></p>) : (

        <div className={`modal ${modalStatus ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {/* content */}
                    {content}
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Name:</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="type list name" />
                            </div>
                        </div>

                    </form>

                </section>

                <footer className="modal-card-foot">
                    <button onClick={handleSubmit} className="button is-success">{btnTitle}</button>
                    <button onClick={hideModal} className="button">Cancel</button>
                </footer>
            </div>
        </div>
    )

    return (
        <div>{modalBody}</div>
    )
}

export default Modal