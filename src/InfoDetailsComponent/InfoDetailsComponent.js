import React from 'react';
import ReactDOM from 'react-dom';
import './InfoDetailsComponent.css';
import bootstrap from 'bootstrap';

function InfoDetailsComponent() {
  return (

    <div>
      <div className="jdrf-p2p-page-details">
        <div className="spirit-list">
          <div className="spirit-list-item spirit-list-item--avatar">
            <div className="spirit-list-item__avatar">
              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
            </div>
            <div className="spirit-list-item__content">
              <div className="spirit-list-item__title">
                <span className="ng-binding">November 1, 2020</span>
              </div>
              <div className="spirit-list-item__meta">
                <div> Starts: 6 AM PST</div>
              </div>
            </div>
          </div>

          <div className="spirit-list-item spirit-list-item--avatar">
            <div className="spirit-list-item__avatar">
              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
            </div>
            <div className="spirit-list-item__content">
              <div className="spirit-list-item__title">
                https://jdrfonewalk.virtualeventsite.com/southernca
              </div>
            </div>
          </div>

          <div className="spirit-list-item spirit-list-item--avatar">
            <div className="spirit-list-item__avatar">
              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
            </div>
            <div className="spirit-list-item__content">
              <div className="spirit-list-item__title"> Sue Pietrzak</div>
              <div className="spirit-list-item__links-contain">
                <a className="spirit-list-item__link" href="mailto:spietrzak@jdrf.org">Email</a>&nbsp;| (213) 769-6320
              </div>
            </div>
          </div>

          <div className="spirit-list-item spirit-list-item--avatar">
            <div className="spirit-list-item__avatar">
              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
            </div>
            <div className="spirit-list-item__content">
              <div className="spirit-list-item__title">Southern California Chapter</div>
              <div className="spirit-list-item__meta">
                Mail Checks To: JDRF<br/>
                3001 Metro Drive Suite 100<br/>
                Bloomington, MN 55425<br/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="jdrf-p2p-greeting__secondary-cta">
        <div className="spirit-row">
          <div
              className="spirit-col-12">
            <button type="button"
                    className="spirit-button spirit-button--secondary spirit-button--with-icon spirit-button--fullwidth ng-scope">
              Share
              <svg className="spirit-icon spirit-icon--share spirit-icon--share-right" aria-hidden="true"></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoDetailsComponent;
