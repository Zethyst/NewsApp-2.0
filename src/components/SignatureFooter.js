import React, { Component } from "react";

export class SignatureFooter extends Component {
  render() {
    return (
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-lg font-bold tracking-wide flex items-center justify-center space-x-2">
              <span>Made with</span>
              <i className="fa fa-heart pulse text-[#e90606]"></i>{" "}
              <span>by</span>
              <a
                href="https://www.linkedin.com/in/akshat-jaiswal-4664a2197/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Akshat Jaiswal
              </a>
            </p>
          </div>
        </div>
      </footer>

      // <footer className="bg-light absolute bottom-0 start-footer start-style w-full">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-12">
      //         <div className="flex justify-center items-center py-4 text-lg font-bold tracking-wide">
      //           <span>
      //             Made With <i className="fa fa-heart pulse text-[#e90606]"></i>{" "}
      //             By{" "}
      //             <a
      //               href="https://www.linkedin.com/in/akshat-jaiswal-4664a2197/"
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               Akshat
      //             </a>
      //           </span>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </footer>
    );
  }
}

export default SignatureFooter;
