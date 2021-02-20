import React from 'react';
import ReactDOM from 'react-dom';
import './AmountRaisedComponent.css';
import bootstrap from 'bootstrap';

function AmountRaisedComponent() {
  return (

        <div className="spirit-row jdrf-p2p-greeting__progress-row">
          <div className="spirit-col-md-7 spirit-col-lg-8 col--vertical-center">
            <div className="jdrf-p2p-greeting__primary-cta visible-xs ng-isolate-scope hl-sticky sticky-top is-sticky"
                 style={{width: "0px", position: "fixed", left: "0px", "z-indedx": 1039, "margin-top": "0px", top: "0px"}}>
              <div
                  className="jdrf-p2p-greeting__cta-col jdrf-p2p-greeting__cta-col--wide jdrf-p2p-greeting__cta-col--donate-top ng-scope">
                <a className="spirit-button">Donate </a>
              </div>

              <div className="jdrf-p2p-greeting__cta-col jdrf-p2p-greeting__cta-col--wide">
                <button type="button"
                        className="spirit-button spirit-button--secondary spirit-button--with-icon ng-scope">Share
                  <svg className="spirit-icon spirit-icon--share spirit-icon--share-right" aria-hidden="true">
                  </svg>
                </button>
              </div>

              <div
                  className="jdrf-p2p-greeting__cta-col jdrf-p2p-greeting__cta-col--popover-right ng-scope jdrf-p2p-greeting__cta-col--donate-bottom">
                <a className="spirit-button">Donate </a>
              </div>
            </div>

            <div style={{height: "0px"}}></div>

            <div className="jdrf-p2p-progress-meter-wrap">
              <div className="jdrf-p2p-progress-meter ng-isolate-scope jdrf-p2p-progress-meter--no-goal">
                <div className="clearfix">
                  <div className="jdrf-p2p-progress-meter__achieved clearfix">
                    <div className="jdrf-p2p-progress-meter__label">
                      <span className="ng-scope">Raised</span>
                    </div>
                    <div className="jdrf-p2p-progress-meter__amount ng-binding">$485,169</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="visible-xs">
              <div className="jdrf-p2p-page-details ">
                <div className="spirit-list">
                  <div className="spirit-list-item spirit-list-item--avatar">
                    <div className="spirit-list-item__avatar">
                      <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                      </svg>
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
                      <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                      </svg>
                    </div>
                    <div className="spirit-list-item__content">
                      <div className="spirit-list-item__title"> https://jdrfonewalk.virtualeventsite.com/southernca
                      </div>
                    </div>
                  </div>

                  <div className="spirit-list-item spirit-list-item--avatar">
                    <div className="spirit-list-item__avatar">
                      <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                      </svg>
                    </div>
                    <div className="spirit-list-item__content">
                      <div className="spirit-list-item__title"> Sue Pietrzak</div>
                      <div className="spirit-list-item__links-contain">
                        <a className="spirit-list-item__link"
                           href="mailto:spietrzak@jdrf.org">Email</a>&nbsp;|
                        (213) 769-6320
                      </div>
                    </div>
                  </div>

                  <div className="spirit-list-item spirit-list-item--avatar">
                    <div className="spirit-list-item__avatar">
                      <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                      </svg>
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
            </div>
          </div>
          <div className="spirit-col-md-5 spirit-col-lg-4 col--vertical-center hidden-spirit-xs hidden-spirit-sm">
            <div className="jdrf-p2p-greeting__primary-cta">
              <div className="spirit-row">
                <div className="spirit-col-12 ng-scope">
                  <a className="spirit-button spirit-button--fullwidth">Donate </a>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
}

export default AmountRaisedComponent;
