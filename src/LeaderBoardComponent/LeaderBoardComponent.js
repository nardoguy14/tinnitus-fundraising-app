import React from 'react';
import ReactDOM from 'react-dom';
import './LeaderBoardComponent.css';
import bootstrap from 'bootstrap';

function LeaderBoardComponent() {

  function createRows() {
    return (
        <div className="spirit-list-item spirit-list-item--avatar ng-scope">
            <div className="spirit-list-item__avatar">
                <a className="spirit-list-item__link-avatar ng-scope">
                    <span className="spirit-image jdrf-p2p-leaderboard__item-photo">
                        <span className="spirit-image__image-wrap">
                            <span className="spirit-image__image"
                                  style={{'background-image': 'url("https://www2.jdrf.org/images/friendraiser_uploads/8151.1893058374.customnull")'}}></span>
                        </span>
                    </span>
                    <span className="jdrf-p2p-leaderboard__item-badge ng-binding ng-scope">1</span>
                </a>
            </div>
            <div className="spirit-list-item__content">
                <div className="spirit-list-item__title">
                    <div className="jdrf-p2p-leaderboard__item-text-row">
                        <span className="jdrf-p2p-leaderboard__item-text-label">
                          <a className="spirit-list-item__link-title" href="TR?fr_id=8151&amp;pg=personal&amp;px=10525730">
                              <span className="ng-binding">Erin Wehrenberg</span>
                          </a>
                        </span>
                        <span className="jdrf-p2p-leaderboard__item-text-amount">
                            <span className="ng-binding">$58,690</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  return (
      <div className="jdrf-p2p-leaderboard-tabs jdrf-p2p-leaderboard-tabs--event" aria-hidden="false">
          <h2 className="spirit-h3">Leaderboard</h2>
          <div className="spirit-card spirit-card--no-elevation jdrf-p2p-leaderboard-card">
              <div className="spirit-card__text">
                  <div className="spirit-card__body">
                      <div className="jdrf-p2p-tabs has-tab-amounts jdrf-p2p-tabs--2">
                          <div className="md-stretch-tabs">
                              <md-pagination-wrapper role="tablist"
                                                     style={{transform: "translate(0px, 0px)",
                                                             'text-align': 'center'}}>
                                  <md-tab-item style={{'max-width': "264px"}}>
                                      <div className="jdrf-p2p-tab__amount">433</div>
                                      <div className="jdrf-p2p-tab__label">
                                          <span className="ng-scope">Participants</span>
                                      </div>
                                  </md-tab-item>


                              </md-pagination-wrapper>
                          </div>

                          <div className="_md" aria-hidden="false">
                              <div id="tab-content-0" className="_md md-no-scroll md-active"
                                              role="tabpanel" aria-labelledby="tab-item-0">
                                  <div>
                                      <div className="jdrf-p2p-leaderboard__search-form ng-scope">
                                          <form name="eventParticipantsForm" className="">
                                              <div className="spirit-form__field-group spirit-form__input spirit-form__input--with-icon hidden-spirit-xs hidden-spirit-sm">
                                                  <div className="spirit-form__input-icon-wrap -left">
                                                      <svg xmlns="http://www.w3.org/2000/svg"
                                                           className="spirit-icon spirit-form__input-icon"
                                                           viewBox="0 0 24 24">
                                                          <path
                                                              d="M11,20c-5,0-9-4-9-9c0-5,4-9,9-9c5,0,9,4,9,9C20,16,16,20,11,20z M11,4c-3.9,0-7,3.1-7,7c0,3.9,3.1,7,7,7c3.9,0,7-3.1,7-7 C18,7.1,14.9,4,11,4z"></path>
                                                          <path
                                                              d="M21,22c-0.3,0-0.5-0.1-0.7-0.3l-4.3-4.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4.3,4.3c0.4,0.4,0.4,1,0,1.4 C21.5,21.9,21.3,22,21,22z"></path>
                                                      </svg>
                                                  </div>
                                                  <input type="text"
                                                         className="spirit-form__input-field"
                                                         placeholder="Search"
                                                         aria-invalid="false" />

                                              </div>
                                          </form>
                                      </div>

                                      <div className="jdrf-p2p-leaderboard__filter-wrap">
                                          <div className="jdrf-p2p-leaderboard__filter">
                                              <div className="spirit-form__select spirit-form__select--transparent">
                                                  <select
                                                      className="spirit-form__select-input"
                                                      aria-invalid="false">
                                                      <option className="spirit-form__select-option" value="fundraising"
                                                              selected="selected">Fundraising
                                                      </option>
                                                      <option className="spirit-form__select-option"
                                                              value="miles">Miles
                                                      </option>
                                                  </select>
                                                  <div className="spirit-form__select-inner"></div>
                                                  <span className="spirit-form__select-open-indicator">
                                                      <svg className="spirit-icon spirit-form__select-open-icon" aria-hidden="true">
                                                      </svg>
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      <div aria-hidden="false">
                                          <div className="jdrf-p2p-leaderboard jdrf-p2p-leaderboard--participants">
                                              <div className="spirit-list">
                                                  {createRows()}
                                              </div>
                                          </div>
                                          <div className="jdrf-p2p-list-pagination-footer">
                                              <a className="spirit-link">
                                                  <strong>See All</strong>
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default LeaderBoardComponent;
