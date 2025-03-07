import React from "react";

const LandingPage = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="bg-black text-gray-100 text-[15px]">
        <div
          className="relative lg:min-h-screen 2xl:min-h-[730px] before:absolute before:inset-0 before:w-full before:bg-black before:opacity-60"
          style={{
            backgroundImage:
              "url('https://readymadeui.com/dark-bg-image.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] relative">
            <div className="lg:flex lg:items-center gap-x-2 relative">
              <div className="flex items-center shrink-0">
                <a href="">
                  <img
                    src="https://readymadeui.com/readymadeui-light.svg"
                    alt="logo"
                    className="w-40"
                  />
                </a>
                <button id="toggleOpen" className="lg:hidden ml-auto">
                  <svg
                    className="w-7 h-7"
                    fill="#fff"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div
                id="collapseMenu"
                className="lg:ml-14 max-lg:hidden lg:!block w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 z-50"
              >
                <button
                  id="toggleClose"
                  className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-black"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path
                      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>

                <div className="lg:flex items-center w-full gap-6 max-lg:fixed max-lg:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                  <ul className="lg:flex gap-x-6 max-lg:space-y-3">
                    <li className="mb-6 hidden max-lg:block">
                      <a href="">
                        <img
                          src="https://readymadeui.com/readymadeui-light.svg"
                          alt="logo"
                          className="w-36"
                        />
                      </a>
                    </li>
                    <li className="max-lg:border-b max-lg:py-3 px-3">
                      <a
                        href=""
                        className="hover:text-blue-600 text-blue-600 block transition-all"
                      >
                        Home
                      </a>
                    </li>
                    <li className="max-lg:border-b max-lg:py-3 px-3">
                      <a
                        href=""
                        className="hover:text-blue-600 block transition-all"
                      >
                        Team
                      </a>
                    </li>
                    <li className="max-lg:border-b max-lg:py-3 px-3">
                      <a
                        href=""
                        className="hover:text-blue-600 block transition-all"
                      >
                        Feature
                      </a>
                    </li>
                    <li className="max-lg:border-b max-lg:py-3 px-3">
                      <a
                        href=""
                        className="hover:text-blue-600 block transition-all"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="max-lg:border-b max-lg:py-3 px-3">
                      <a
                        href=""
                        className="hover:text-blue-600 block transition-all"
                      >
                        About
                      </a>
                    </li>
                  </ul>

                  <div className="flex xl:w-80 max-xl:w-full bg-transparent px-6 py-2.5 rounded border border-white lg:ml-auto  max-lg:mt-10">
                    <input
                      type="text"
                      placeholder="Search something..."
                      className="w-full bg-transparent rounded outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192.904 192.904"
                      width="16px"
                      className="cursor-pointer fill-gray-400"
                    >
                      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-5xl mx-auto text-center relative px-4 sm:px-10 mt-16">
            <h1 className="lg:text-7xl md:text-6xl text-4xl font-semibold mb-6 md:!leading-[80px]">
              Build Landing Pages with Typeform Integration
            </h1>
            <p className="text-base text-gray-400">
              Embark on a gastronomic journey with our curated dishes, delivered
              promptly to your doorstep. Elevate your dining experience today.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 items-center mt-16">
              <div className="flex flex-col items-center text-center">
                <h5 className="font-bold text-2xl text-blue-600 mb-2">10+</h5>
                <p>Years Experience</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h5 className="font-bold text-2xl text-blue-600 mb-2">890</h5>
                <p>Cases Solved</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h5 className="font-bold text-2xl text-blue-600 mb-2">250</h5>
                <p>Business Partners</p>
              </div>
            </div>
            <div className="mt-14 flex gap-x-8 gap-y-4 justify-center max-sm:flex-col">
              <button
                type="button"
                className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all"
              >
                Start a free trial
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-600 border border-blue-600 px-6 py-3.5 rounded-md text-gray-100 transition-all"
              >
                API documentation
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-10">
          <div className="mt-32 max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl text-center mx-auto">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                Our Features
              </h2>
              <p className="text-gray-400">
                Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad
                consequat id. Dolore et sint mollit in nisi tempor culpa
                consectetur.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mt-16">
              <div className="text-center bg-[#111] px-6 py-8 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-12 mb-6 inline-block bg-gray-700 p-3 rounded-xl"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
                    data-original="#000000"
                  />
                  <path
                    d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-xl mb-4">Tailored Customization</h3>
                <p className="text-gray-400">
                  Customize our product to perfectly align with your brand and
                  meet your unique requirements.
                </p>
                <a
                  href=";"
                  className="text-blue-600 inline-block mt-4 hover:underline"
                >
                  Learn more
                </a>
              </div>
              <div className="text-center bg-[#111] px-6 py-8 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-12 mb-6 inline-block bg-gray-700 p-3 rounded-xl"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000" />
                    </clipPath>
                  </defs>
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="40"
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
                      data-original="#000000"
                    />
                    <path
                      d="M178 271.894 233.894 216 334 316.105"
                      data-original="#000000"
                    />
                  </g>
                </svg>
                <h3 className="text-xl mb-4">Robust Security Measures</h3>
                <p className="text-gray-400">
                  Rest easy knowing that your data is safeguarded by the latest
                  and most robust security measures available.
                </p>
                <a
                  href=";"
                  className="text-blue-600 inline-block mt-4 hover:underline"
                >
                  Learn more
                </a>
              </div>
              <div className="text-center bg-[#111] px-6 py-8 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-12 mb-6 inline-block bg-gray-700 p-3 rounded-xl"
                  viewBox="0 0 512.001 512.001"
                >
                  <path
                    d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-xl mb-4">24/7 Customer Support</h3>
                <p className="text-gray-400">
                  Get prompt and reliable assistance with our 24/7 customer
                  support for all your inquiries and concerns.
                </p>
                <a
                  href=";"
                  className="text-blue-600 inline-block mt-4 hover:underline"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mt-32">
            <div>
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                Transform Your Ideas with our Comprehensive Template Library
              </h2>
              <p className="text-gray-400">
                Unlock creativity with our versatile templates designed to
                elevate your landing pages. Whether you're showcasing products,
                collecting feedback, or promoting events, our templates make the
                process seamless and visually compelling. Qui elit labore in
                nisi dolore tempor anim laboris ipsum ad ad consequat id. Dolore
                et sint mollit in nisi tempor culpa consectetur.
              </p>
            </div>
            <button className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10">
              Get started today
            </button>
          </div>

          <div className="mt-32 rounded-md px-4 py-12">
            <div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
              <div>
                <img
                  src="https://readymadeui.com/management-img.webp"
                  alt="Premium Benefits"
                  className="w-full mx-auto"
                />
              </div>
              <div className="max-md:text-center">
                <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                  Try using our templates with tailwind CSS
                </h2>
                <p className="text-gray-400">
                  Veniam proident aute magna anim excepteur et ex consectetur
                  velit ullamco veniam minim aute sit. Elit occaecat officia et
                  laboris Lorem minim. Officia do aliqua adipisicing ullamco in.
                </p>
                <button
                  type="button"
                  className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
                >
                  Try it today
                </button>
              </div>
            </div>
          </div>

          <div className="mt-32 rounded-md px-4 py-12">
            <div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
              <div className="max-md:text-center">
                <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                  Elevate Your Experience with Modern Elegance
                </h2>
                <p className="text-gray-400">
                  Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim
                  nulla officia ea sit deserunt. Eu eu quis anim aute Laboris
                  qui Lorem ad tempor ut reprehenderit.
                </p>
                <button
                  type="button"
                  className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
                >
                  Try it today
                </button>
              </div>
              <div>
                <img
                  src="https://readymadeui.com/team-image.webp"
                  alt="Premium Benefits"
                  className="w-full mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl text-center mx-auto">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                What our happy client say
              </h2>
              <p className="text-gray-400">
                Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla
                officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem
                ad tempor ut reprehenderit.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-md:justify-center text-center mt-16">
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://readymadeui.com/profile_2.webp"
                    className="w-24 h-24 rounded-full shadow-xl border-2 border-white"
                  />
                  <div className="mt-4">
                    <h4 className="text-base">John Doe</h4>
                    <p className="text-xs text-blue-600 mt-2">CEO, Company</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400">
                    The service was amazing. I never had to wait that long for
                    my food. The staff was friendly and attentive, and the
                    delivery was impressively prompt.
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://readymadeui.com/profile_3.webp"
                    className="w-24 h-24 rounded-full shadow-xl border-2 border-white"
                  />
                  <div className="mt-4">
                    <h4 className="text-base">Mark Adair</h4>
                    <p className="text-xs text-blue-600 mt-2">CEO, Company</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400">
                    The service was amazing. I never had to wait that long for
                    my food. The staff was friendly and attentive, and the
                    delivery was impressively prompt.
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://readymadeui.com/profile_4.webp"
                    className="w-24 h-24 rounded-full shadow-xl border-2 border-white"
                  />
                  <div className="mt-4">
                    <h4 className="text-base">Simon Konecki</h4>
                    <p className="text-xs text-blue-600 mt-2">CEO, Company</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400">
                    The service was amazing. I never had to wait that long for
                    my food. The staff was friendly and attentive, and the
                    delivery was impressively prompt.
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                Pricing Plans
              </h2>
              <p className="text-gray-400">
                Change your plant according your needs
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16 max-md:max-w-md max-md:mx-auto">
              <div className="hover:outline outline-blue-600 rounded relative overflow-hidden transition-all p-6">
                <div className="text-left">
                  <h4 className="text-xl mb-4">Hobby</h4>
                  <h3 className="text-4xl">$10.00</h3>
                  <p className="mt-4 text-gray-400">
                    Ideal for individuals who need quick access to basic
                    features.
                  </p>
                </div>
                <div className="mt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      50 Image generations
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      500 Credits
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Monthly 100 Credits Free
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Customer Support
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      50GB Cloud Storage
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
                >
                  Get started today
                </button>
              </div>
              <div className="hover:outline outline-blue-600 rounded relative overflow-hidden transition-all p-6">
                <div className="text-left">
                  <h4 className="text-xl mb-4">Professional</h4>
                  <h3 className="text-4xl">$30.00</h3>
                  <p className="mt-4 text-gray-400">
                    Ideal for individuals who who need advanced features and
                    tools for client work.
                  </p>
                </div>
                <div className="mt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      500 Image generations
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      5000 Credits
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Monthly 1000 Credits Free
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Customer Support
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      500GB Cloud Storage
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
                >
                  Get started today
                </button>
              </div>
              <div className="hover:outline outline-blue-600 rounded relative overflow-hidden transition-all p-6">
                <div className="text-left">
                  <h4 className="text-xl mb-4">Business</h4>
                  <h3 className="text-4xl">$45.00</h3>
                  <p className="mt-4 text-gray-400">
                    Ideal for businesses who need personalized services and
                    security for large teams.
                  </p>
                </div>
                <div className="mt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      1000 Image generations
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      8000 Credits
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Monthly 5000 Credits Free
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      Customer Support
                    </li>
                    <li className="flex items-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        className="mr-4 bg-gray-200 fill-[#333] rounded-full p-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                      1500GB Cloud Storage
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
                >
                  Get started today
                </button>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                  LATEST BLOGS
                </h2>
                <p className="text-gray-400">
                  Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim
                  nulla officia ea sit deserunt.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
                <div className="cursor-pointer rounded overflow-hidden group">
                  <div>
                    <span className="block text-gray-400 mb-2">
                      10 FEB 2023
                    </span>
                    <h3 className="text-xl group-hover:text-blue-600 transition-all">
                      A Guide to Igniting Your Imagination
                    </h3>
                    <div className="mt-6">
                      <p className="text-gray-400 ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis accumsan, nunc et tempus blandit, metus mi
                        consectetur felis turpis vitae ligula.
                      </p>
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src="https://readymadeui.com/team-1.webp"
                      className="w-9 h-9 rounded-full"
                    />
                    <p className="text-xs text-gray-400">BY JOHN DOE</p>
                  </div>
                </div>
                <div className="cursor-pointer rounded overflow-hidden group">
                  <div>
                    <span className="block text-gray-400 mb-2">7 JUN 2023</span>
                    <h3 className="text-xl group-hover:text-blue-600 transition-all">
                      Hacks to Supercharge Your Day
                    </h3>
                    <div className="mt-6">
                      <p className="text-gray-400 ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis accumsan, nunc et tempus blandit, metus mi
                        consectetur felis turpis vitae ligula.
                      </p>
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src="https://readymadeui.com/team-2.webp"
                      className="w-9 h-9 rounded-full"
                    />
                    <p className="text-xs text-gray-400">BY MARK ADAIR</p>
                  </div>
                </div>
                <div className="cursor-pointer rounded overflow-hidden group">
                  <div>
                    <span className="block text-gray-400 mb-2">5 OCT 2023</span>
                    <h3 className="text-xl group-hover:text-blue-600 transition-all">
                      Trends and Predictions
                    </h3>
                    <div className="mt-6">
                      <p className="text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis accumsan, nunc et tempus blandit, metus mi
                        consectetur felis turpis vitae ligula.
                      </p>
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src="https://readymadeui.com/team-3.webp"
                      className="w-9 h-9 rounded-full"
                    />
                    <p className="text-xs text-gray-400">BY SIMON KONECKI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <div className="mb-16 max-w-2xl text-center mx-auto">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
                Application Metrics
              </h2>
              <p className="text-gray-400">
                Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla
                officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem
                ad tempor ut reprehenderit.
              </p>
            </div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-12 lg:divide-x lg:divide-gray-300">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-10 inline-block"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M437 268.152h-50.118c-6.821 0-13.425.932-19.71 2.646-12.398-24.372-37.71-41.118-66.877-41.118h-88.59c-29.167 0-54.479 16.746-66.877 41.118a74.798 74.798 0 0 0-19.71-2.646H75c-41.355 0-75 33.645-75 75v80.118c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-80.118c0-41.355-33.645-75-75-75zm-300.295 36.53v133.589H45c-8.271 0-15-6.729-15-15v-80.118c0-24.813 20.187-45 45-45h50.118c4.072 0 8.015.553 11.769 1.572a75.372 75.372 0 0 0-.182 4.957zm208.59 133.589h-178.59v-133.59c0-24.813 20.187-45 45-45h88.59c24.813 0 45 20.187 45 45v133.59zm136.705-15c0 8.271-6.729 15-15 15h-91.705v-133.59a75.32 75.32 0 0 0-.182-4.957 44.899 44.899 0 0 1 11.769-1.572H437c24.813 0 45 20.187 45 45v80.119z"
                    data-original="#000000"
                  />
                  <path
                    d="M100.06 126.504c-36.749 0-66.646 29.897-66.646 66.646-.001 36.749 29.897 66.646 66.646 66.646 36.748 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm-.001 103.292c-20.207 0-36.646-16.439-36.646-36.646s16.439-36.646 36.646-36.646 36.646 16.439 36.646 36.646-16.439 36.646-36.646 36.646zM256 43.729c-49.096 0-89.038 39.942-89.038 89.038s39.942 89.038 89.038 89.038 89.038-39.942 89.038-89.038c0-49.095-39.942-89.038-89.038-89.038zm0 148.076c-32.554 0-59.038-26.484-59.038-59.038 0-32.553 26.484-59.038 59.038-59.038s59.038 26.484 59.038 59.038c0 32.554-26.484 59.038-59.038 59.038zm155.94-65.301c-36.748 0-66.646 29.897-66.646 66.646.001 36.749 29.898 66.646 66.646 66.646 36.749 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm0 103.292c-20.206 0-36.646-16.439-36.646-36.646.001-20.207 16.44-36.646 36.646-36.646 20.207 0 36.646 16.439 36.646 36.646s-16.439 36.646-36.646 36.646z"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-4xl text-blue-600 mt-6">400+</h3>
                <p className="mt-4">Unique Visitors</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-10 inline-block"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill-rule="evenodd"
                    d="M64.217 333.491h41.421c5.508 0 10 4.492 10 10v97.833c0 5.508-4.492 10-10 10H64.217c-5.508 0-10-4.492-10-10v-97.833c0-5.508 4.492-10 10-10zm155.471-61.737h-41.422c-5.508 0-10 4.492-10 10v159.571c0 5.508 4.492 10 10 10h41.422c5.508 0 10-4.492 10-10V281.754c0-5.508-4.493-10-10-10zm114.049-64.466h-41.421c-5.508 0-10 4.492-10 10v224.036c0 5.508 4.492 10 10 10h41.421c5.508 0 10-4.492 10-10V217.288c-.001-5.507-4.493-10-10-10zm72.625-57.992h41.421c5.508 0 10 4.492 10 10v282.028c0 5.508-4.492 10-10 10h-41.421c-5.508 0-10-4.492-10-10V159.296c0-5.508 4.492-10 10-10zm2.707-106.018a7.98 7.98 0 0 1-.812-15.938l49.121-2.666a7.98 7.98 0 0 1 8.307 9.094l.006.001-7.088 48.68a7.986 7.986 0 0 1-15.812-2.25l3.878-26.632C385.642 108.019 321.72 152.702 257.158 189.5c-69.131 39.402-138.98 69.744-206.779 93.355a7.976 7.976 0 0 1-5.25-15.062c66.943-23.313 135.906-53.269 204.154-92.167 63.527-36.208 126.449-80.188 186.56-133.799zM45.262 481.873h421.477c5.508 0 10 4.492 10 10v3.193c0 5.508-4.492 10-10 10H45.262c-5.508 0-10-4.492-10-10v-3.193c0-5.508 4.492-10 10-10zM139.587 6.935c-48.325 0-87.5 39.175-87.5 87.5s39.175 87.5 87.5 87.5 87.5-39.175 87.5-87.5c-.001-48.325-39.176-87.5-87.5-87.5zm-8 32.13v5.279c-5.474 1.183-10.606 3.537-14.768 6.92-6.626 5.387-10.827 13.21-10.353 22.965.476 9.817 5.372 16.4 12.186 20.849 5.887 3.844 13.093 5.827 19.733 6.917 5.206.855 10.757 2.201 14.95 4.733 3.261 1.969 5.71 4.838 6.23 9.127.072.595.111 1.013.117 1.26.08 3.359-1.536 5.926-3.962 7.767-3.135 2.379-7.564 3.785-12.005 4.324a33.57 33.57 0 0 1-3.172.254c-5.25.126-10.424-1.156-14.458-3.842-3.274-2.18-5.775-5.367-6.818-9.552a7.982 7.982 0 0 0-15.5 3.812c2.094 8.399 7.044 14.749 13.505 19.052 4.252 2.831 9.164 4.736 14.315 5.711v5.165a8 8 0 1 0 16-.001v-5.01c6.309-1.038 12.699-3.388 17.758-7.226 6.302-4.782 10.494-11.632 10.275-20.829a29.17 29.17 0 0 0-.179-2.76c-1.22-10.052-6.653-16.591-13.856-20.94-6.27-3.786-13.768-5.668-20.637-6.796-4.832-.793-9.912-2.13-13.607-4.543-2.767-1.806-4.752-4.416-4.937-8.224-.202-4.157 1.615-7.512 4.478-9.84 2.281-1.854 5.196-3.144 8.362-3.781a22.978 22.978 0 0 1 10.115.244c5.278 1.338 10.083 4.817 12.614 10.845a7.997 7.997 0 0 0 10.469 4.281 7.997 7.997 0 0 0 4.281-10.469c-4.701-11.196-13.65-17.664-23.489-20.158a37.3 37.3 0 0 0-1.646-.377v-5.161a8 8 0 1 0-16.001.004z"
                    clip-rule="evenodd"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-4xl text-blue-600 mt-6">450+</h3>
                <p className="mt-4">Total Sales</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-10 inline-block"
                  viewBox="0 0 28 28"
                >
                  <path
                    d="M18.56 16.94h-3.12l.65-2.16a2.58 2.58 0 0 0-1.66-3.21 1.41 1.41 0 0 0-1.81 1l-.1.42a8.61 8.61 0 0 1-2.26 4l-.57.56a1.56 1.56 0 0 0-1.21-.59h-.73a1.56 1.56 0 0 0-1.56 1.54v6.44a1.56 1.56 0 0 0 1.56 1.56h.73a1.55 1.55 0 0 0 1.33-.76l.14.07a6.55 6.55 0 0 0 2.91.69h3.59a3.58 3.58 0 0 0 3-1.6 6.34 6.34 0 0 0 1.07-3.53v-2.49a1.94 1.94 0 0 0-1.96-1.94zm-9.56 8a.56.56 0 0 1-.56.56h-.69a.56.56 0 0 1-.56-.56V18.5a.56.56 0 0 1 .56-.56h.73a.56.56 0 0 1 .52.56zm10.5-3.57a5.38 5.38 0 0 1-.9 3 2.59 2.59 0 0 1-2.15 1.15h-3.59a5.53 5.53 0 0 1-2.46-.58l-.4-.2V18.6l.92-.92a9.63 9.63 0 0 0 2.53-4.46l.1-.41a.43.43 0 0 1 .2-.26.4.4 0 0 1 .32 0 1.58 1.58 0 0 1 1 2l-.84 2.81a.5.5 0 0 0 .08.44.48.48 0 0 0 .4.2h3.79a.94.94 0 0 1 .94.94zM11 7.3l-.32 1.85a1.09 1.09 0 0 0 .44 1.09 1.11 1.11 0 0 0 .65.22 1.18 1.18 0 0 0 .52-.13L14 9.45l1.67.88a1.1 1.1 0 0 0 1.17-.09 1.09 1.09 0 0 0 .44-1.08L17 7.3 18.31 6a1.1 1.1 0 0 0 .29-1.14 1.12 1.12 0 0 0-.9-.76l-1.87-.27L15 2.12a1.12 1.12 0 0 0-2 0l-.83 1.69-1.87.27a1.12 1.12 0 0 0-.9.76A1.1 1.1 0 0 0 9.69 6zm-.6-2.23 2.13-.31a.49.49 0 0 0 .47-.27l1-1.93a.11.11 0 0 1 .2 0l1 1.93a.49.49 0 0 0 .38.27l2.13.31a.12.12 0 0 1 .09.08.11.11 0 0 1 0 .11l-1.54 1.5a.53.53 0 0 0-.15.45l.37 2.11a.09.09 0 0 1-.05.11.1.1 0 0 1-.12 0l-1.9-1a.47.47 0 0 0-.46 0l-1.91 1a.09.09 0 0 1-.11 0 .09.09 0 0 1-.05-.11l.37-2.11a.53.53 0 0 0-.15-.45l-1.54-1.5a.11.11 0 0 1 0-.11.12.12 0 0 1-.12-.08zm-3.06 8.18a1 1 0 0 0 1-1.19l-.27-1.52 1.12-1.09a1 1 0 0 0-.56-1.73L7.1 7.5l-.69-1.39a1.05 1.05 0 0 0-1.82 0L3.9 7.5l-1.53.22a1 1 0 0 0-.56 1.73l1.11 1.09-.27 1.52a1 1 0 0 0 .41 1 1 1 0 0 0 1.07.07l1.37-.72 1.37.72a1 1 0 0 0 .47.12zm-1.84-1.9a.46.46 0 0 0-.23.06l-1.63.82.36-1.78a.53.53 0 0 0-.2-.45L2.51 8.71l1.8-.26a.47.47 0 0 0 .37-.27l.83-1.63.81 1.63a.47.47 0 0 0 .37.27l1.8.29L7.2 10a.53.53 0 0 0-.15.45l.29 1.8-1.61-.84a.46.46 0 0 0-.23-.06zm20.95-2.94a1 1 0 0 0-.82-.69L24.1 7.5l-.69-1.39a1.05 1.05 0 0 0-1.82 0L20.9 7.5l-1.53.22a1 1 0 0 0-.56 1.73l1.11 1.09-.27 1.52a1 1 0 0 0 .41 1 1 1 0 0 0 1.07.07l1.37-.72 1.37.72a1 1 0 0 0 .47.12 1 1 0 0 0 1-1.19l-.27-1.52 1.11-1.09a1 1 0 0 0 .27-1.04zM24.2 10a.53.53 0 0 0-.15.45l.29 1.8-1.61-.84a.47.47 0 0 0-.46 0l-1.63.82.36-1.78a.53.53 0 0 0-.2-.45l-1.29-1.29 1.8-.26a.47.47 0 0 0 .37-.27l.83-1.63.81 1.63a.47.47 0 0 0 .37.27l1.8.29z"
                    data-name="Layer 2"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-4xl text-blue-600 mt-6">500+</h3>
                <p className="mt-4">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-10 inline-block"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M477.797 290.203c0 59.244-23.071 114.942-64.963 156.834S315.244 512 256 512s-114.942-23.071-156.834-64.963-64.963-97.59-64.963-156.834c0-39.621 10.579-78.512 30.595-112.468 19.419-32.944 47.178-60.48 80.276-79.63 7.646-4.427 17.437-1.814 21.861 5.836 4.426 7.648 1.813 17.437-5.836 21.861-53.882 31.175-88.951 87.036-94.189 148.4H84.6c8.837 0 16 7.163 16 16s-7.163 16-16 16H66.884C74.594 398.12 148.083 471.609 240 479.319v-17.717c0-8.837 7.163-16 16-16s16 7.163 16 16v17.717c91.917-7.71 165.406-81.199 173.116-173.116h-17.717c-8.837 0-16-7.163-16-16s7.163-16 16-16h17.69c-5.238-61.364-40.307-117.227-94.19-148.4-7.648-4.425-10.262-14.212-5.836-21.861 4.425-7.648 14.214-10.261 21.861-5.836 33.098 19.148 60.857 46.685 80.277 79.63 20.016 33.955 30.596 72.846 30.596 112.467zm-253.173-220.2 15.259-15.259-.258 71.899c-.031 8.837 7.106 16.025 15.942 16.058h.059c8.81 0 15.967-7.126 15.999-15.942l.259-72.248 15.492 15.492c3.124 3.124 7.219 4.687 11.313 4.687s8.189-1.563 11.313-4.687c6.248-6.248 6.248-16.379 0-22.627L267.313 4.687c-6.248-6.248-16.379-6.248-22.627 0l-42.689 42.689c-6.248 6.248-6.248 16.379 0 22.627s16.379 6.248 22.627 0zM272 174.358v64.628c16.74 5.24 29.977 18.478 35.218 35.217h50.493c8.837 0 16 7.163 16 16s-7.163 16-16 16h-50.493c-6.823 21.795-27.202 37.655-51.218 37.655-29.585 0-53.654-24.069-53.654-53.655 0-24.015 15.86-44.394 37.654-51.217v-64.628c0-8.837 7.163-16 16-16s16 7.163 16 16zm5.655 115.845c0-11.94-9.715-21.654-21.655-21.654s-21.654 9.714-21.654 21.654 9.714 21.655 21.654 21.655 21.655-9.714 21.655-21.655z"
                    data-original="#000000"
                  />
                </svg>
                <h3 className="text-4xl text-blue-600 mt-6">600+</h3>
                <p className="mt-4">System Uptime (in hours)</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#111] px-4 sm:px-10 py-12 mt-32">
          <div className="lg:max-w-[50%] mx-auto text-center">
            <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
              Newsletter
            </h2>
            <p className="text-gray-400">
              Subscribe to our newsletter and stay up to date with the latest
              news, updates, and exclusive offers. Get valuable insights. Join
              our community today!
            </p>
            <div className="bg-[#444] flex px-2 py-1 rounded-md text-left mt-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent pl-2"
              />
              <button
                type="button"
                className="px-6 py-3 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all ml-auto"
              >
                Submit
              </button>
            </div>
          </div>
          <hr className="border-gray-400 my-12" />
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg mb-6">About Us</h4>
              <p className="text-gray-400 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                gravida, mi eu pulvinar cursus, sem elit interdum mauris.
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-6">Services</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Mobile App Development
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-6">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Ebooks
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-6">About Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Mission and Values
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="text-gray-400 hover:text-blue-600 transition-all"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
{
  /* 
var toggleOpen = document.getElementById('toggleOpen');
    var toggleClose = document.getElementById('toggleClose');
    var collapseMenu = document.getElementById('collapseMenu');

    function handleClick() {
      if (collapseMenu.style.display === 'block') {
        collapseMenu.style.display = 'none';
      } else {
        collapseMenu.style.display = 'block';
      }
    }

    toggleOpen.addEventListener('click', handleClick);
    toggleClose.addEventListener('click', handleClick);

   */
}
