
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
const Carrers = () => {
    const cardStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    borderRadius: '8px',
  };

  const headingStyle = {
    color: '#f7941d',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const subHeadingStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '5px',
    color:'black'
  };

  const labelStyle = {
    fontWeight: 'bold',
    color:'black'
  };

  const emailStyle = {
    fontWeight: 'bold',
    color: '#000',
  };
const container={
  backgroundColor: '#f8f9fa',
  paddingTop:'20px',
  paddingBottom:'20px',
}

  return (
    <div>
        <Helmet>
              <title>Careers - Arrow Publication Pvt ltd</title>
              <meta
                name="description"
                content="Welcome to Arrow Publication Pvt. Ltd. We offer Careers for students and professionals in the field of education."
              />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            {/* Layout */}
            <Layout title={"Careers - Arrow Publication Pvt ltd"}>
               <div className="bg-secondary text-white py-5">
        <div className="container text-white">
          <h1 className="fw-bold mb-0 text-white">Careers</h1>
        </div>
      </div>

      {/* Join Our Team Section */}
<div className="w-full d-flex justify-content-center align-items-center">
  <div className="text-secondary d-flex flex-column align-items-center justify-content-center py-5 ">
    <h1 className="fw-bold">Join Our Team</h1>
    <h6 className="fw-bold">Build your career with us at Arrow Publications</h6>
  </div>
</div>


   <div className=" " style={container}>
      <div style={cardStyle} >
        <h4 style={headingStyle}>Open Positions</h4>

        <h5 style={subHeadingStyle}>Marketing Executive (Education Sector)</h5>
        <p className="text-muted">Pan-India (as per assigned territory)</p>

        <p className='text-black'>
          Are you passionate about the school education sector and love connecting with educators? Here's your opportunity to join a dynamic team that shapes the future of learning!
        </p>

        <ul className="list-unstyled">
          <li className='text-black'><span style={labelStyle}>Age Group:</span> 25 – 35 years</li>
          <li className='text-black'><span style={labelStyle}>Experience:</span> 2–3 years (preferably in educational publishing or similar)</li>
        </ul>

        <p style={labelStyle}>Key Responsibilities:</p>
        <ul className='text-black'>
          <li>Promote and market school textbooks to schools, educators, and academic institutions</li>
          <li>Build strong, lasting relationships with principals, teachers, and academic coordinators</li>
          <li>Travel extensively within the assigned territory to drive outreach and engagement</li>
          <li>Represent and position educational products in line with CBSE, ICSE, and State Board requirements</li>
        </ul>

        <p style={labelStyle}>What We're Looking For:</p>
        <ul className='text-black'>
          <li>Excellent communication, interpersonal, and persuasion skills</li>
          <li>A proactive, self-motivated, and results-driven mindset</li>
          <li>Familiarity with the Indian school education ecosystem</li>
          <li>Experience in educational publishing or a related field is a strong advantage</li>
        </ul>

        <p className='text-black'>If you're ready to make a meaningful impact in education and thrive on the road, we’d love to hear from you!</p>
        <p>Send your resume to <span style={emailStyle}>mail@arrowpublicationsindia.com</span></p>
      </div>
    </div>

                </Layout>
    </div>
  );
}

export default Carrers;
