import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Grid } from 'semantic-ui-react';

import LevelsGraph from 'containers/Fidelity/LevelsGraph';
import check from 'assets/images/check.png';
import NotifImage from 'assets/images/notif-type-transaction.png';
import Referals from 'assets/images/referalsIcon.png';
import LevelImage from './LevelsImage';

import './MyRewards.scss';

const MyRewards = ({ userData }) => {
  return (
    <div className="myrewards-container">
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="levelsContaner">
              {userData &&
                userData.data &&
                userData.data.Rewards &&
                userData.data.Rewards.StatusText &&
                userData.data.Rewards.StatusCode === '6' && (
                  <>
                    <LevelImage
                      level={global.translate('Gold', 1182)}
                      statusCode="4"
                    />
                  </>
                )}

              {userData &&
                userData.data &&
                userData.data.Rewards &&
                userData.data.Rewards.PreviousLevel && (
                  <>
                    <LevelImage
                      level={
                        userData.data.Rewards.PreviousLevel.LevelValue
                      }
                      statusCode={
                        userData.data.Rewards.PreviousStatusCode
                      }
                    />
                  </>
                )}

              {userData &&
                userData.data &&
                userData.data.Rewards &&
                userData.data.Rewards.StatusText && (
                  <>
                    <span className="points">
                      {/*  {`${userData.data.Rewards.NextLevel.PointsValue} pts`} */}
                      {userData.data.Rewards.LevelPoints &&
                        userData.data.Rewards.StatusCode !== '0' &&
                        `${
                          userData.data.Rewards.LevelPoints[
                            `PointsValue${userData.data.Rewards.StatusCode}`
                          ]
                        } pts`}
                    </span>
                    <LevelImage
                      level={userData.data.Rewards.StatusText}
                      isCurrent="currentStatus"
                      statusCode={userData.data.Rewards.StatusCode}
                      currentPoints={
                        userData.data.Rewards.TotalPoints.PointsValue
                      }
                    />

                    <span className="points">
                      {userData.data.Rewards.LevelPoints &&
                        userData.data.Rewards.StatusCode !== '6' &&
                        `${userData.data.Rewards.NextLevel.PointsValue} pts`}
                    </span>
                    {/*   <span className="points">
                      {`${userData.data.Rewards.NextLevel.PointsValue} pts`}
                    </span> */}
                  </>
                )}

              {userData &&
                userData.data &&
                userData.data.Rewards &&
                userData.data.Rewards.NextLevel && (
                  <>
                    <LevelImage
                      level={
                        userData.data.Rewards.NextLevel.LevelValue
                      }
                      statusCode={
                        userData.data.Rewards.NextStatusCode
                      }
                    />
                    <span className="points">
                      {userData.data.Rewards.LevelPoints &&
                        userData.data.Rewards.StatusCode === '0' &&
                        `${userData.data.Rewards.LevelPoints.PointsValue2} pts`}
                    </span>
                  </>
                )}

              {userData &&
                userData.data &&
                userData.data.Rewards &&
                userData.data.Rewards.StatusText &&
                userData.data.Rewards.StatusCode === '0' && (
                  <>
                    <LevelImage
                      level={global.translate('Silver', 1182)}
                      statusCode="2"
                    />
                  </>
                )}
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="congratsBox">
              <div className="congsTxt">
                <div className="congDesc">
                  <span className="congrats cong-title">
                    {global.translate('Congratulations', 950)},{' '}
                    {global.translate('Your current level is', 1441)}
                  </span>
                </div>
                {userData &&
                  userData.data &&
                  userData.data.Rewards &&
                  userData.data.Rewards.StatusText && (
                    <span className="levelName">
                      {userData.data.Rewards.StatusText}
                    </span>
                  )}
              </div>
              <div className="congratsPoints">
                {userData &&
                  userData.data &&
                  userData.data.Rewards &&
                  userData.data.Rewards.YearPoints && (
                    <span className="congratsPointsItem">
                      <span>
                        {global.translate(
                          'Points earned this year',
                          1190,
                        )}
                      </span>
                      <span className="yearpoints">
                        {userData.data.Rewards.YearPoints.PointsValue}
                      </span>
                    </span>
                  )}

                {userData &&
                  userData.data &&
                  userData.data.Rewards &&
                  userData.data.Rewards.InCount && (
                    <span className="congratsPointsItem">
                      <span>
                        {global.translate(
                          'Inbound transactions count',
                          1187,
                        )}
                      </span>
                      <span className="inbound">
                        {userData.data.Rewards.InCount.CountValue}
                      </span>
                    </span>
                  )}

                {userData &&
                  userData.data &&
                  userData.data.Rewards &&
                  userData.data.Rewards.OutCount && (
                    <span className="congratsPointsItem">
                      <span>
                        {global.translate(
                          'Outbound transactions count',
                          1188,
                        )}
                      </span>
                      <span className="outbound">
                        {userData.data.Rewards.OutCount.CountValue}
                      </span>
                    </span>
                  )}
              </div>

              <div className="btnsContainer">
                <div className="congsBtns">
                  <Button
                    className="levelBtns bigBtn"
                    content="View my membership card"
                  />
                  <Button
                    className="levelBtns smallBtn"
                    content="Learn more"
                  />
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="GetPointsGuideTitle">
              {global.translate('How to get points?', 1439)}
            </div>
            <div className="GetPointsGuide">
              <div>
                <div className="guideItems">
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={Referals} />
                    </span>

                    {userData &&
                      userData.data &&
                      userData.data.Rewards &&
                      userData.data.Rewards.ReferralPoints && (
                        <span>
                          {/*   {
                            userData.data.Rewards.ReferralPoints
                              .PointsText
                          } */}

                          {global.translate(
                            'Earn these points for every person you refer to us.',
                            1422,
                          )}

                          <span
                            style={{
                              fontWeight: 600,
                              marginLeft: '5px',
                            }}
                          >
                            {
                              userData.data.Rewards.ReferralPoints
                                .PointsValue
                            }
                          </span>
                        </span>
                      )}
                  </div>
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={NotifImage} />
                    </span>
                    {userData &&
                      userData.data &&
                      userData.data.Rewards &&
                      userData.data.Rewards.ReferralPoints && (
                        <span>
                          {global.translate(
                            'Number of transactions required for change of level',
                            1423,
                          )}

                          <span
                            style={{
                              fontWeight: 600,
                              marginLeft: '5px',
                            }}
                          >
                            {
                              userData.data.Rewards
                                .RewardStatusChangeCount.PointsValue
                            }
                          </span>
                        </span>
                      )}
                  </div>
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={NotifImage} />
                    </span>
                    {userData &&
                      userData.data &&
                      userData.data.Rewards &&
                      userData.data.Rewards.ReferralPoints && (
                        <span>
                          {userData.data.Rewards.NextLevel.PointsText}

                          {global.translate(
                            'Additional points needed for next level',
                            1192,
                          )}

                          <span
                            style={{
                              fontWeight: 600,
                              marginLeft: '5px',
                            }}
                          >
                            {
                              userData.data.Rewards.NextLevel
                                .PointsValue
                            }
                          </span>
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="btnsContainer">
                <Button
                  className="levelBtns smallBtn moreGuideBtn"
                  content="Learn more"
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="levelChart">
              <LevelsGraph
                userData={
                  userData &&
                  userData.data &&
                  userData.data.Rewards &&
                  userData.data.Rewards.LevelPoints
                }
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

MyRewards.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

MyRewards.defaultProps = {};

export default MyRewards;