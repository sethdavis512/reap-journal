import React from 'react';
import ShowHide from './ShowHide';

export default function Guide() {
    return (
        <ShowHide label="Guide">
            <div className="box content">
                <h6 className="title is-6">READ</h6>
                <p>
                    Open your Bible and ask the Holy Spirit to teach, correct,
                    and train you (2 Timothy 3:16). As you’re reading, ask these
                    questions: What is happening in this passage? What things
                    are emphasized, repeated, related? What do you see about
                    God? What is God doing in this passage? What do you see
                    about man?
                </p>
                <h6 className="title is-6">EXAMINE</h6>
                <p>
                    Spend some time reflecting. Ask yourself these questions,
                    and write down your thoughts: How do you think the author
                    wants his audience to respond? What do you learn about God’s
                    character? What wrong beliefs about God and myself did I
                    have?
                </p>
                <h6 className="title is-6">APPLY</h6>
                <p>
                    After examining the passage, apply the text to your own
                    life. Ask yourself these questions: How do I need to repent?
                    What truths do I need to believe? What false beliefs must I
                    turn from? What can I do – empowered by the Holy Spirit –
                    today to apply this passage?
                </p>
                <h6 className="title is-6">PRAY</h6>
                <p>
                    Pray through the passage and your application, asking God to
                    change your heart and to change your life, based on the time
                    you’ve spent in God’s Word.
                </p>
            </div>
        </ShowHide>
    );
}

Guide.propTypes = {};
