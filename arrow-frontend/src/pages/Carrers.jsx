
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
const Carrers = () => {
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
      <div className='flex flex-column align-items-center justify-content-center card !w-full'>
 <div className="container text-center py-5 flex flex-column align-items-center">
        <h2 className="text-secondary mb-2">Join Our Team</h2>
        <p className="text-muted ">Build your career with us at Arrow Publications</p>
      </div>

      {/* Open Positions Section */}
      <div className="container pb-5 w-full  flex-column align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="bg-white shadow-sm border-0 mb-5">
              <div className="card-body p-4">
                <h3 className="text-warning mb-4">Open Positions</h3>
                
                <div className="job-listing">
                  <h4 className="text-dark">Marketing Executive (Education Sector)</h4>
                  <p className="text-muted small">Pan-India (as per assigned territory)</p>
                  
                  <p>
                    Are you passionate about the school education sector and love connecting with educators? Here's your opportunity to join a 
                    dynamic team that shapes the future of learning!
                  </p>
                  
                  <ul className="mb-4">
                    <li><strong>Age Group:</strong> 30 – 35 years</li>
                    <li><strong>Experience:</strong> 2-3 years (preferably in educational publishing or similar)</li>
                  </ul>
                  
                  <p className="fw-bold mb-2">Key Responsibilities:</p>
                  <ul className="mb-4">
                    <li>Promote and market school textbooks to schools, educators, and academic institutions</li>
                    <li>Build strong, lasting relationships with principals, teachers, and academic coordinators</li>
                    <li>Travel extensively within the assigned territory to drive outreach and engagement</li>
                    <li>Represent and position educational products in line with CBSE, ICSE, and State Board requirements</li>
                  </ul>
                  
                  <p className="fw-bold mb-2">What We're Looking For:</p>
                  <ul className="mb-4">
                    <li>Excellent communication, interpersonal, and persuasion skills</li>
                    <li>A proactive, self-motivated, and results-driven mindset</li>
                    <li>Familiarity with the Indian school education ecosystem</li>
                    <li>Experience in educational publishing or a related field is a strong advantage</li>
                  </ul>
                  
                  <p className="mt-4">
                    If you're ready to make a meaningful impact in education and thrive on the road, we'd love to hear from you!
                  </p>
                  
                  <p>Send your resume to <a href="mailto:mail@arrowpublicationsindia.com" className="text-primary">mail@arrowpublicationsindia.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
     
                </Layout>
    </div>
  );
}

export default Carrers;
