import React from "react";
import MailModal from "../Modals/mail"

export default function Interview() {

	return (
		<div className='splash-container'>
            <div className='link-container-left'></div>
           <img className='splash-gif' src='/robotsplash.gif' />
           <MailModal className='mail' />
            <div className='link-container-right'></div>
		</div>
	);
}
