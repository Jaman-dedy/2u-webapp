import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Form, Checkbox, Loader } from 'semantic-ui-react';

import './QuestionsForm.scss';

const QuestionsForm = ({
  resetPasswordData,
  onInputChange,
  screenTwo,
}) => {
  const {
    handleNext,
    userSecurityQuestionsFx,
    resetPasswordQuestions,
  } = screenTwo;

  const [hasQuestions, setHasQuestions] = useState(false);

  const handleCheckbox = (e, data) => {
    onInputChange({
      target: {
        name: data.name,
        value: data.checked === true ? 'Yes' : 'No',
      },
    });

    setHasQuestions(!hasQuestions);

    if (data.checked === true) {
      userSecurityQuestionsFx();
    }
  };

  return (
    <div className="questions-form">
      <p className="text-darken-blue white-space-nowrap">
        {global.translate(
          'Kindly provide answers to these questions',
        )}
      </p>

      <Container>
        <Form>
          <Form.Field>
            <div className="sec_checkbox_container">
              <span className="sec_checkbox text-darken-blue">
                {global.translate('I have set my security questions')}
              </span>
              <Checkbox
                type="checkbox"
                name="SecurityQuestionSet"
                className="checkbox"
                onChange={(e, data) => handleCheckbox(e, data)}
              />
            </div>
          </Form.Field>

          {hasQuestions &&
            !resetPasswordQuestions.loading &&
            resetPasswordQuestions.Questions && (
              <>
                {resetPasswordQuestions.Questions.map((item, key) => (
                  <Form.Field key={item.Text}>
                    <span className="question white-space-nowrap text-darken-blue">
                      <div className="dot" />
                      {item.Text}
                    </span>
                    <Form.Input
                      type="text"
                      placeholder={global.translate('Your answer')}
                      value={resetPasswordData[`A${key + 1}`]}
                      name={`A${key + 1}`}
                      onChange={e => {
                        onInputChange(e);
                      }}
                    />
                  </Form.Field>
                ))}
              </>
            )}

          {hasQuestions && resetPasswordQuestions.loading && (
            <Loader active inline="centered" />
          )}

          <Form.Button
            type="Next"
            primary
            onClick={() => handleNext()}
          >
            {global.translate('Next', 10)}
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

QuestionsForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default QuestionsForm;