import React from "react";

export default function Interview() {

	return (
		<div className='about-container'>
            <div className='left'>
                <a href='https://www.linkedin.com/in/michaelmihalchik'>
                    <img className='link' src='/robot-linkedin.png' />
                </a>
                <a href='https://www.github.com/mike4344'>
                    <img className='link' src='/robot-github.png' />
                </a>
            </div>
            <img className='center' src='/about.png' />
            <div className='right' >
                <a href='https://www.mikemihalchik.com'>
                    <img className='link logo' src='/Logo.jpg' />
                </a>
            </div>
		</div>
	);
}
