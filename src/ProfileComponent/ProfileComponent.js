import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}

    render(){
        return (
          <div style={{padding: "40px"}}>
              <ProfileBannerComponent />
              <div className="jdrf-p2p-page-container">
                  <div className="jdrf-p2p-personal__primary-cta ng-isolate-scope hl-sticky sticky-top sticky-before">
                      <div className="jdrf-p2p-personal__cta-col jdrf-p2p-personal__cta-col--donate-top ng-scope">
                          <a className="spirit-button"
                          href="Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_TYPE=20&amp;PROXY_ID=1441477"> Donate
                              <span >&nbsp;to <span>Kevin</span>
                              </span>
                          </a>
                      </div>

                      <div className="jdrf-p2p-personal__cta-col">
                          <div>
                              <button type="button"
                                      className="spirit-button spirit-button--secondary spirit-button--with-icon">Share
                                  <svg className="spirit-icon spirit-icon--share spirit-icon--share-right"
                                  aria-hidden="true">
                                    <use xlink:href="../jdrf-framework/dist/spirit/icons/spirit.svg#share"></use>
                                  </svg>
                              </button>
                          </div>
                      </div>

                      <div className="jdrf-p2p-personal__cta-col jdrf-p2p-personal__cta-col--donate-bottom">
                          <a className="spirit-button"
                          href="Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_TYPE=20&amp;PROXY_ID=1441477"> Donate
                              <span>&nbsp;to
                                  <span>Kevin</span>
                              </span>
                          </a>
                      </div>
                  </div>

                  <div className="spirit-row">
                      <div className="spirit-col-md-7 spirit-col-lg-8 jdrf-p2p-personal__left-col">
                          <div className="visible-xs">
                              <div className="jdrf-p2p-progress-meter-wrap jdrf-p2p-progress-meter-wrap--small"
                                   aria-hidden="false">
                                  <div className="jdrf-p2p-progress-meter ng-scope ng-isolate-scope">
                                      <div className="clearfix">
                                          <div className="jdrf-p2p-progress-meter__achieved clearfix">
                                              <div
                                                  className="jdrf-p2p-progress-meter__label">
                                                  <span>Raised</span>
                                              </div>
                                              <div className="jdrf-p2p-progress-meter__amount ng-binding">
                                                  $695
                                              </div>
                                          </div>
                                          <div className="jdrf-p2p-progress-meter__goal clearfix ng-scope">
                                              <div
                                                  className="jdrf-p2p-progress-meter__label">Goal
                                              </div>
                                              <div className="jdrf-p2p-progress-meter__amount ng-binding">$500
                                              </div>
                                          </div>
                                      </div>
                                      <div className="jdrf-p2p-progress-meter__bar ng-scope">
                                          <div className="jdrf-p2p-progress-meter__bar-inner"
                                               style={{width: "100%"}}></div>
                                      </div>
                                      <div className="jdrf-p2p-progress-meter__bottom clearfix ng-scope">
                                          <div
                                              className="jdrf-p2p-progress-meter__bottom-left">
                                              <span>
                                                  <strong>
                                                      <span>100</span>%
                                                  </strong>
                                              </span>
                                          </div>
                                          <div className="jdrf-p2p-progress-meter__bottom-right">
                                              <span>
                                                  <strong>
                                                      <span>$500</span>
                                                  </strong>
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="jdrf-p2p-page-details">
                                  <div className="spirit-list">
                                      <div className="spirit-list-item spirit-list-item--avatar ng-scope">
                                          <div className="spirit-list-item__avatar">
                                              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                                  <use
                                                      xlink:href="../jdrf-framework/dist/spirit/icons/spirit.svg#heart"></use>
                                              </svg>
                                          </div>

                                          <div className="spirit-list-item__content">
                                              <div className="spirit-list-item__title">
                                                  <div className="jdrf-p2p-page-details__text-row">
                                                      <span className="jdrf-p2p-page-details__text-label">
                                                          <span className="ng-binding">Kevin's</span> Donors
                                                      </span>
                                                      <span className="jdrf-p2p-page-details__text-amount">
                                                          <span className="ng-binding">9</span>
                                                      </span>
                                                  </div>
                                              </div>
                                              <div className="spirit-list-item__links-contain">
                                                  <a className="spirit-list-item__link">View Donors</a>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="spirit-list-item spirit-list-item--avatar">
                                          <div className="spirit-list-item__avatar">
                                              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                                  <use xlink:href="../jdrf-framework/dist/spirit/icons/spirit.svg#users"></use>
                                              </svg>
                                          </div>
                                          <div className="spirit-list-item__content">
                                              <div className="spirit-list-item__title">B4 Bombers</div>
                                              <div className="spirit-list-item__links-contain"><a
                                                  className="spirit-list-item__link"
                                                  href="TR?fr_id=8115&amp;pg=team&amp;team_id=306163">View Team Page</a>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="spirit-list-item spirit-list-item--avatar">
                                          <div className="spirit-list-item__avatar">
                                              <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                                  <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#calendar"></use>
                                              </svg>
                                          </div>
                                          <div className="spirit-list-item__content">
                                              <div className="spirit-list-item__title">JDRF One Walk, Western
                                                  Massachusetts 2020
                                              </div>
                                              <div className="spirit-list-item__links-contain">
                                                  <a className="spirit-list-item__link" href="TR?fr_id=8115&amp;pg=entry">View Event Page</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="jdrf-p2p-personal__story">
                              <div className="spirit-long-form-text">
                                  <div className="jdrf-p2p-personal__story-headline">
                                      <h2 className="spirit-h3">Welcome to My Personal Page for B4 Bombers </h2>
                                  </div>
                                  <div className="jdrf-p2p-personal__video"></div>
                                  <div className="jdrf-p2p-personal__story-content">
                                      <div className="js--page-rich-text-container">
                                          <p>Hello! Thank you for taking the
                                          time to visit&nbsp;our page for <strong><span
                                              className="jqte-fix">B4 Bombers </span></strong>- our walk team, in
                                          support of our son, Jack, and daughter, Emily, and their ongoing fight against
                                          Juvenile Diabetes. &nbsp;<br/><br/>Type 1, or juvenile diabetes, is a
                                              devastating disease that affects millions of people, a large and growing
                                              percentage of them children.<br/><br/>There is some good news, though. JDRF
                                                  is our best hope for finding a cure. It funds more type 1 diabetes
                                                  research than any other charity worldwide and it's making progress
                                                  along many promising paths toward better treatments and a
                                                  cure.<br/><br/>Now, more than ever, you can make a crucial difference.
                                                      Won't you please give to JDRF as generously as possible? Together,
                                                      we can make the cure a reality!&nbsp; Please consider joining and
                                                      sponsoring our team, <strong><span
                                                          className="jqte-fix">B4 Bombers&nbsp;</span></strong>or
                                                      any&nbsp;of our individual team members,&nbsp;as I know it will
                                                      make a personal difference to our family.&nbsp; Thank you for your
                                                      generosity.&nbsp;</p><p>Kevin, Lauren, Emily, and Jack Brayton</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="jdrf-p2p-personal__secondary-cta hidden-spirit-xs hidden-spirit-sm">
                              <div className="jdrf-p2p-personal__cta-col ng-scope">
                                  <a className="spirit-button" href="Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_TYPE=20&amp;PROXY_ID=1441477"> Donate
                                      <span className="ng-scope">&nbsp;to
                                          <span className="ng-binding">Kevin</span>
                                      </span>
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                          <div className="jdrf-p2p-progress-meter-wrap jdrf-p2p-progress-meter-wrap--small" aria-hidden="false">
                              <div className="jdrf-p2p-progress-meter ng-scope ng-isolate-scope">
                                  <div className="clearfix">
                                      <div className="jdrf-p2p-progress-meter__achieved clearfix">
                                          <div className="jdrf-p2p-progress-meter__label">
                                              <span className="ng-scope">Raised</span>
                                          </div>
                                          <div className="jdrf-p2p-progress-meter__amount">$695</div>
                                      </div>
                                      <div className="jdrf-p2p-progress-meter__goal clearfix">
                                          <div className="jdrf-p2p-progress-meter__label">Goal</div>
                                          <div className="jdrf-p2p-progress-meter__amount ng-binding">$500</div>
                                      </div>
                                  </div>

                                  <div className="jdrf-p2p-progress-meter__bar ng-scope">
                                      <div className="jdrf-p2p-progress-meter__bar-inner" style={{width: "100%"}}></div>
                                  </div>
                                  <div className="jdrf-p2p-progress-meter__bottom clearfix ng-scope">
                                      <div className="jdrf-p2p-progress-meter__bottom-left">
                                          <span className="ng-scope">
                                              <strong>
                                                  <span className="ng-binding">100</span>
                                                  %
                                              </strong>
                                          </span>
                                      </div>
                                      <div className="jdrf-p2p-progress-meter__bottom-right">
                                          <span className="ng-scope">
                                              <strong>
                                                  <span className="ng-binding">$500</span>
                                              </strong>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="jdrf-p2p-personal__donor-list ng-scope">
                              <h2 className="spirit-h6">
                                  <span className="ng-binding">Kevin's</span> Donors
                              </h2>
                              <div className="jdrf-p2p-personal__donor-list-item ng-scope">
                                  <span className="jdrf-p2p-personal__donor-name">
                                      <strong>
                                          <span className="ng-binding">Mrs. Carole J Brayton</span>
                                      </strong>
                                  </span>
                                  <span className="jdrf-p2p-personal__donor-amount ng-binding">$125</span>
                              </div>
                              
                              <div className="jdrf-p2p-personal__donor-list-item ng-scope">
                                  <span className="jdrf-p2p-personal__donor-name">
                                      <strong>
                                          <span className="ng-binding">Anonymous</span>
                                      </strong>
                                  </span> 
                                  <span className="jdrf-p2p-personal__donor-amount ng-binding"></span>
                              </div>
                              
                              <div className="jdrf-p2p-personal__donor-list-item ng-scope">
                                  <span className="jdrf-p2p-personal__donor-name">
                                      <strong>
                                          <span className="ng-binding">Uncle Blay</span>
                                      </strong>
                                  </span> 
                                  <span className="jdrf-p2p-personal__donor-amount ng-binding">$100</span>
                              </div>
                              
                              <div className="jdrf-p2p-personal__donor-list-item ng-scope">
                                  <span className="jdrf-p2p-personal__donor-name">
                                      <strong>
                                          <span className="ng-binding">PRW Wealth Management, LLC</span>
                                      </strong>
                                  </span> 
                                  <span className="jdrf-p2p-personal__donor-amount ng-binding">$100</span>
                              </div>
                              
                              
                              <div className="jdrf-p2p-personal__donor-list-footer ng-scope">
                                  <a className="spirit-link" >
                                      <strong>View All 
                                          <span className="ng-binding">9</span> 
                                          Donors
                                      </strong>
                                  </a>
                              </div>
                              
                          </div>
                          
                          <div className="jdrf-p2p-page-details">
                              <div className="spirit-list">
                                  <div className="spirit-list-item spirit-list-item--avatar">
                                      <div className="spirit-list-item__avatar">
                                          <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                              <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#users"></use>
                                          </svg>
                                      </div>
                                      <div className="spirit-list-item__content">
                                          <div className="spirit-list-item__title">B4 Bombers</div>
                                          <div className="spirit-list-item__links-contain"><a
                                              className="spirit-list-item__link"
                                              href="TR?fr_id=8115&amp;pg=team&amp;team_id=306163">View Team Page</a>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="spirit-list-item spirit-list-item--avatar">
                                      <div className="spirit-list-item__avatar">
                                          <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                              <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#calendar"></use>
                                          </svg>
                                      </div>
                                      <div className="spirit-list-item__content">
                                          <div className="spirit-list-item__title">JDRF One Walk, Western Massachusetts
                                              2020
                                          </div>
                                          <div className="spirit-list-item__links-contain">
                                              <a className="spirit-list-item__link" href="TR?fr_id=8115&amp;pg=entry">
                                                  View Event Page
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
        );
    }
}

export default ProfileComponent;
