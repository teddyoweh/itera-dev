const commitStore = [
    {
        "commit_hash": "df9ab2ed",
        "author": "Teddy Oweh",
        "date": "2025-03-02 17:16:41",
        "human_readable_date": "sunday 02th march 2025 @ 05:16pm",
        "message": "stable",
        "summary": {
            "summary": "### Component Updates and Image Assets\n- **Assets Inclusion:** Added new image assets `herox.png`, `stickman.gif`, and `needle-underline.svg` to improve visual content on the page, enhancing user engagement with dynamic and static images.\n- **Icon Usage:** Integrated `ArrowRight` icon from `iconsax-react` to provide intuitive navigation cues within the interface.\n\n### Styling and Framework Utilization\n- **Styling Enhancements:** Applied styles from `landing.scss`, suggesting improvements in visual layout and design consistency across the page.\n- **Client-Side Interactivity:** Utilized `useState` from React to manage component states, indicating a focus on creating interactive and responsive user experiences.\n\n### Navigation and Routing\n- **Next.js Integration:** Employed `Link` and `usePathname` from `next/navigation` to facilitate seamless client-side routing and path management, enhancing navigation efficiency within the application.",
            "blurb": "Updated page.js with new image assets, styling, and improved navigation using React and Next.js.",
            "tags": [
                "page.js",
                "image assets",
                "styling",
                "React",
                "Next.js"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "6d977930",
        "author": "Teddy Oweh",
        "date": "2025-03-02 17:09:39",
        "human_readable_date": "sunday 02th march 2025 @ 05:09pm",
        "message": "stable",
        "summary": {
            "summary": "**New Resume Template Additions:**\n- Added several new resume templates in the `src/app/assets/resume_templates` directory, including `authentic.jpeg`, `classic_resume.jpeg`, `elegant_clean.jpeg`, `modern_clean.png`, `modern_minimalist_resume.jpeg`, `professional_clean.jpeg`, `sharp_structured.jpeg`, and `timeless_standard.jpeg`. These templates enhance the variety of styles available for users.\n\n**Billing Page Enhancements:**\n- Expanded the `billing/page.jsx` file from 225 to 312 lines. This update likely includes new features or improved functionality for the billing page, though specific changes aren't detailed in the diff.\n\n**RenderResume Component Update:**\n- Made minor updates to the `RenderResume.js` file, increasing from 171 to 176 lines. This might involve small feature additions or bug fixes.\n\n**ResumeBuilder Component Update:**\n- Increased `ResumeBuilder.js` from 1490 to 1508 lines, suggesting enhancements to the resume-building functionality.\n\n**New Configuration for Resume Templates:**\n- Introduced a new `resume_templates.js` configuration file, likely to manage and organize the new resume templates more effectively.\n\n**Styling Changes:**\n- Added new font-face declarations for 'Newsreader' and 'Alif' fonts in `globals.css`, enhancing typography options.\n- Significant modification in `setup.scss`, expanding from 1069 to 1600 lines, indicating a major overhaul in the setup styling.\n- Substantial updates to `billing.scss`, extending from 1149 to 1453 lines, suggesting a comprehensive redesign of the billing page's style.\n- Minor adjustments across various other style files, such as `auth.scss`, `landing.scss`, and `onboarding.scss`, to refine UI elements.\n\n**Functionality Updates in Other Components:**\n- Minor line increases in `mainPage.jsx`, `SetupMyJobs.jsx`, `page.js`, `onboarding/page.jsx`, and `resumes/page.js`, reflecting small tweaks or feature enhancements.\n- Reduction in lines for `page.js` from 222 to 210, indicating some code cleanup or refactoring.\n\n**General Code Improvements:**\n- Overall, the changes suggest a focus on enhancing user interface elements, expanding resume template options, and refining billing and job setup functionalities.",
            "blurb": "Major updates include new resume templates, billing page enhancements, and styling overhauls.",
            "tags": [
                "resume_templates",
                "billing/page.jsx",
                "RenderResume.js",
                "ResumeBuilder.js",
                "resume_templates.js",
                "globals.css",
                "setup.scss",
                "billing.scss"
            ],
            "changes_type": [
                "added",
                "modified"
            ]
        }
    },
    {
        "commit_hash": "c2ebef0b",
        "author": "Teddy Oweh",
        "date": "2025-02-28 16:08:37",
        "human_readable_date": "friday 28th february 2025 @ 04:08pm",
        "message": "stable",
        "summary": {
            "summary": "### Page.js Modifications:\n- **Imports Adjusted**: Added new imports including `ArrowUpDown`, `Check`, `FileText`, and many more from `lucide-react`. This indicates an expansion or refactoring of the icons or components used within the file.\n- **File Lines Changed**: Increased from 1872 to 1874 lines, suggesting minor additions or adjustments in code logic or structure.\n\n### File Deletions:\n- **.DS_Store**: Removed the `.DS_Store` file from `src/app/`. This file is typically a macOS system file and its removal is likely part of a cleanup process to ensure the repository doesn't include unnecessary or system-specific files.",
            "blurb": "Minor updates in page.js with new imports and cleanup of system files.",
            "tags": [
                "page.js",
                "imports",
                ".DS_Store"
            ],
            "changes_type": [
                "modified",
                "deleted"
            ]
        }
    },
    {
        "commit_hash": "f805515b",
        "author": "Teddy Oweh",
        "date": "2025-02-28 15:52:30",
        "human_readable_date": "friday 28th february 2025 @ 03:52pm",
        "message": "stable",
        "summary": {
            "summary": "Page.js Updates:\n\u2022 A significant expansion in functionality, with the addition of 152 lines of code. This likely includes new features or enhancements to existing features.\n\u2022 Introduced a variety of new imports from the 'lucide-react' library, suggesting an expansion in UI components, such as icons and tools, which can enhance user interactions and visual elements.\n\u2022 Inclusion of 'file-saver' library, indicating a new feature for saving files, potentially allowing users to download content directly from the application.\n\nStylesheet Modifications (myjobs.scss):\n\u2022 Added 149 lines of new styles, which might be related to the new features or UI components added in page.js.\n\u2022 Modified layout properties for responsive design. Changed the layout to be more flexible by allowing scrolling (removed the fixed position). This update improves usability, especially on smaller screens or devices with limited display space.\n\u2022 Introduced a transition effect for smoother UI interactions.\n\u2022 Enhanced the scrolling behavior on the .myjobs component for better navigation and user experience.",
            "blurb": "Enhanced UI components and usability in 'myjobs' with new icons, file-saving features, and flexible scrolling layout.",
            "tags": [
                "page.js",
                "myjobs.scss",
                "lucide-react",
                "file-saver",
                "UI components",
                "scrolling layout"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "7ce79189",
        "author": "Teddy Oweh",
        "date": "2025-02-28 06:13:26",
        "human_readable_date": "friday 28th february 2025 @ 06:13am",
        "message": "stable",
        "summary": {
            "summary": "Improvements to the Application Manager:\n\u2022 **JavaScript Updates:** In `src/app/myapplications/page.js`, the file was expanded, with 29 new lines of code added. These additions likely include new import statements or functionality enhancements for the application page, although specific new features or functions are not detailed in the diff.\n\n\u2022 **Styling Enhancements:** The `src/app/styles/application-manager.scss` file saw significant changes, with 138 new lines added. This likely includes new or updated styles for the application's page layout, such as the `.applications-page` class, which now ensures full-screen display with a fixed position, and the `.resume-store` class, which includes transitions and responsive design elements. These modifications improve the visual and functional aspects of the application manager.",
            "blurb": "Enhanced styling and JavaScript updates have been made to the application manager for improved functionality and appearance.",
            "tags": [
                "page.js",
                "application-manager.scss",
                "applications-page",
                "resume-store"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "e977d884",
        "author": "Teddy Oweh",
        "date": "2025-02-28 04:59:27",
        "human_readable_date": "friday 28th february 2025 @ 04:59am",
        "message": "stable",
        "summary": {
            "summary": "**Modifications in Source Code Files:**\n- **conversations/page.js**: \n  - Added 2 new lines of code, likely including additional imports or minor logic changes based on the context.\n- **myapplications/page.js**:\n  - Reduced by 32 lines, indicating possible code cleanup or refactoring to remove unused imports or simplify the code structure.\n- **myjobs/Jobcard.jsx**:\n  - Added 2 new lines, possibly for additional functionality or minor updates. This file includes imports from external libraries such as `lucide-react`, `framer-motion`, and project-specific services and contexts.\n\n**Styling Enhancements:**\n- **application-manager.scss**:\n  - Expanded significantly from 2553 to 2830 lines.\n  - Major updates to layout and styling, particularly for `.applications-page` and `.resume-store`.\n  - Changes include adjustments in flexbox layout, ensuring full viewport height and width, and refining scrolling behavior.",
            "blurb": "Updated several JavaScript files and significantly expanded SCSS styles for better layout and import management.",
            "tags": [
                "conversations/page.js",
                "myapplications/page.js",
                "myjobs/Jobcard.jsx",
                "application-manager.scss"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "aead3e26",
        "author": "Teddy Oweh",
        "date": "2025-02-28 02:06:50",
        "human_readable_date": "friday 28th february 2025 @ 02:06am",
        "message": "stable",
        "summary": {
            "summary": "**StatusBadge Component Updates:**\n- Introduced a new dependency, `PartyPopper`, from the `lucide-react` library.\n- Enhanced the `StatusBadge` component to include new SVG icons for different statuses, improving the visual representation of status indicators.\n\n**Onboarding Page Enhancements:**\n- Added multiple new imports from `lucide-react` to enhance the iconography throughout the onboarding page.\n- Utilized new React hooks, including `useCallback` and `useMemo`, to improve component performance through optimized rendering.\n\n**Application Manager Styles Update:**\n- Updated `.applications-page` and `.resume-store` styles to ensure full viewport height usage and improve layout consistency.\n- Revised the `.details-content-wrapper` to enable scrollable content with enhanced styling properties.\n\n**Onboarding Styles Adjustments:**\n- Refined the `.onboarding-container` styles to ensure consistent alignment and spacing within the onboarding flow.\n- Adjusted the `font-family` to use \"Google Sans\" for a uniform look across the interface.",
            "blurb": "Enhanced StatusBadge component, onboard page, and style adjustments for better UI consistency and performance.",
            "tags": [
                "StatusBadge.js",
                "page.jsx",
                "application-manager.scss",
                "onboarding.scss"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "1a06bfcb",
        "author": "Teddy Oweh",
        "date": "2025-02-27 21:28:03",
        "human_readable_date": "thursday 27th february 2025 @ 09:28pm",
        "message": "stable",
        "summary": {
            "summary": "**App Context File Update:**\n- **User State Initialization:** Modified how the user state is initialized by checking if the window object is defined before attempting to access local storage. This change prevents potential errors during server-side rendering where the window object is not available.\n- **Socket.IO Integration:** Continued use of Socket.IO client setup with the existing configuration, ensuring real-time data synchronization between the client and server.\n- **Context API Usage:** Maintained the use of React's Context API to provide global state management across the application. This structure facilitates the sharing of state such as user data and other application-wide states.",
            "blurb": "Updated user state initialization in appContext.js to prevent errors during server-side rendering by checking for window object availability.",
            "tags": [
                "appContext.js",
                "useState",
                "localStorage",
                "window object",
                "Socket.IO",
                "Context API"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "ce45bf53",
        "author": "Teddy Oweh",
        "date": "2025-02-27 20:38:27",
        "human_readable_date": "thursday 27th february 2025 @ 08:38pm",
        "message": "stable",
        "summary": {
            "summary": "### Component Modification in BlurredTimeout.jsx:\n- **Import Statements**: Modified to include additional icons from the `lucide-react` library, specifically adding `Zap`, `Clock`, `AlertCircle`, `ChevronRight`, `Star`, `CreditCard`, and `InfinityIcon`. These are likely used for UI enhancements or indicating status.\n- **Context Usage**: Utilizes `useContext` to access the `AppContext`, obtaining the `user` object. This allows the component to dynamically adjust behavior based on the user's `limitType`.\n- **State Management**: Introduced a new state variable `timeRemaining`, which suggests that this component manages a timer related to the user's session or a specific feature's availability.\n- **User Limit Type Logic**: Implements logic to determine the `limitType`, defaulting to 'credits' if not explicitly set, indicating a feature toggle or user-specific limitation mechanism.\n\nOverall, these modifications aim to enhance the functionality and interactivity of the `BlurredTimeout` component by integrating more dynamic and context-aware features.",
            "blurb": "Enhanced BlurredTimeout component with dynamic icons and improved context usage.",
            "tags": [
                "BlurredTimeout.jsx",
                "useContext",
                "AppContext",
                "lucide-react"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "86f0a64b",
        "author": "Teddy Oweh",
        "date": "2025-02-27 18:47:58",
        "human_readable_date": "thursday 27th february 2025 @ 06:47pm",
        "message": "stable",
        "summary": {
            "summary": "**Configuration Changes:**\n- In `next.config.mjs`, commented out the export of `MillionLint.next` configuration and enabled the default `nextConfig` export. This change suggests a potential shift away from using `MillionLint` for configuration or testing purposes.\n\n**New Components and Styles:**\n- Added a new component `BlurredTimeout.jsx` and its associated styles in `timeout.scss`. This introduces a new visual or functional feature potentially related to user interaction under certain conditions.\n\n**Page Logic Enhancements:**\n- Modified `createresume/page.js` to include `BlurredTimeout` component when `user.user_credits` are below 15. This logic change likely provides a different user experience based on credit availability.\n\n**Configuration Adjustments:**\n- In `config/server.js`, maintained the dynamic server endpoints but ensured they switch based on the environment (production or development). This configuration aligns the server interactions with the appropriate environment settings.\n\n**Minor Adjustments and Clean Up:**\n- In `myjobs/page.js`, some minor restructuring, potentially to accommodate new imports or logic changes, ensuring the file is up-to-date with recent enhancements.",
            "blurb": "Switched default configuration, added a timeout component, and tweaked page logic based on user credits.",
            "tags": [
                "next.config.mjs",
                "BlurredTimeout.jsx",
                "timeout.scss",
                "createresume/page.js",
                "config/server.js",
                "myjobs/page.js"
            ],
            "changes_type": [
                "modified",
                "added"
            ]
        }
    },
    {
        "commit_hash": "495e88fc",
        "author": "Teddy Oweh",
        "date": "2025-02-26 02:38:17",
        "human_readable_date": "wednesday 26th february 2025 @ 02:38am",
        "message": "stable",
        "summary": {
            "summary": "### Server Configuration Update:\n- **Environment-based URLs:**   \n  - For production (`isProd` is `true`), server URLs are set to `https://api.retrak.co`, `https://clutchmsg.retrak.co/api`, and `wss://clutchbot.retrak.co/ws`.\n  - For development (`isProd` is `false`), server URLs are set to `http://localhost:5555`, `http://localhost:8557/api`, and `ws://localhost:8765/ws`.\n- **Microservice Endpoint:**  \n  - Explicitly defined `https://needaresume-microservice-fdeb12f632d8.herokuapp.com` as the endpoint for the microservice.\n- **Code Cleanup:**  \n  - Removed 4 lines of potentially unused code, indicating a cleanup to maintain code efficiency.",
            "blurb": "Updated server configuration for environment-based URL management and cleaned up unused code.",
            "tags": [
                "server.js",
                "environment variables",
                "URLs",
                "microservice"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "049460a7",
        "author": "Teddy Oweh",
        "date": "2025-02-26 02:10:12",
        "human_readable_date": "wednesday 26th february 2025 @ 02:10am",
        "message": "stable",
        "summary": {
            "summary": "### Update in `SetupMyJobs.jsx` File:\n- **Line Addition**: The file has been modified to include one additional line, increasing the total number of lines from 523 to 524.\n- **Imports**: \n  - No new imports were added in this change, but it maintains a diverse set of imports including hooks like `useState`, `useContext`, `useEffect`, and `useRef` for managing state and side effects.\n  - Imports from other local files, such as `'./setup.scss'` for styling and `AppContext` from the context directory, remain unchanged.\n  - Continued use of various components and icons from `../config/server`, indicating integration with API endpoints or server configurations.\n- **Client Directive**: The statement `\"use client\";` is present, suggesting that this component is intended to run on the client-side, possibly indicating a React or Next.js environment.\n\n### Impact:\n- The change is minimal and involves the addition of a single line, which does not seem to include new logic or functionality. This kind of modification might be related to a small adjustment or a formatting change.",
            "blurb": "A minor update was made to `SetupMyJobs.jsx`, adding a single line without altering its core functionality.",
            "tags": [
                "SetupMyJobs.jsx",
                "lines",
                "client directive"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "ea8cc48e",
        "author": "Teddy Oweh",
        "date": "2025-02-26 02:04:49",
        "human_readable_date": "wednesday 26th february 2025 @ 02:04am",
        "message": "stable",
        "summary": {
            "summary": "### Modification in SetupMyJobs Component:\n- **File Modified:** `SetupMyJobs.jsx`\n  - No changes in the number of lines, but the import and component structure has been maintained.\n  - Imports a wide range of utility components and icons indicating potential UI feature integrations or updates in the job setup section.\n\n### Styling Updates in SetupMyJobs:\n- **File Modified:** `setup.scss`\n  - Added a new line to the existing setup styles.\n  - Adjusted the background gradient properties, changing from a 135-degree to a 273-degree gradient, and modifying the RGBA values for a different visual effect.\n  - Ensures improved visual clarity and potentially aligns the UI design with current design requirements.",
            "blurb": "Updated UI components in SetupMyJobs, focusing on style tweaks and imports for potential functionality enhancements.",
            "tags": [
                "SetupMyJobs.jsx",
                "setup.scss",
                "UI Components",
                "Styling"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "01c1960c",
        "author": "Teddy Oweh",
        "date": "2025-02-26 02:01:13",
        "human_readable_date": "wednesday 26th february 2025 @ 02:01am",
        "message": "stable",
        "summary": {
            "summary": "Page.js Modifications:\n- Updated import statements to include new icons such as `FileText`, `History`, and `Heart`, enhancing the application's UI capabilities with more interactive elements.\n- Expanded the use of various React hooks (`useContext`, `useEffect`, `useState`, `useCallback`, `useMemo`), suggesting increased dynamic functionality and improved state management within the component.\n\nSCSS Enhancements:\n- Adjusted styles in `resume-store.scss`, particularly within the `.page-content` and `.resume-workspace` classes, to optimize layout and responsive design.\n- Introduced more precise styling for `.workspace-header` and `.header-content`, focusing on margins and flexbox properties to better align elements and improve visual hierarchy.\n- Enhanced `.title-section` styling to provide a cleaner and more organized appearance, likely improving readability and user experience.",
            "blurb": "Enhanced UI and styling for improved layout and functionality in the resume page.",
            "tags": [
                "page.js",
                "resume-store.scss",
                "UI",
                "React hooks",
                "Styling"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "d529449b",
        "author": "Teddy Oweh",
        "date": "2025-02-26 00:57:36",
        "human_readable_date": "wednesday 26th february 2025 @ 12:57am",
        "message": "stable",
        "summary": {
            "summary": "Styling and UI Adjustments:\n- **SetupMyJobs.jsx:**\n  - Enhanced the UI by modifying the import statements to include more diverse icons from various categories like Briefcase, Building2, MapPin, Code, etc., facilitating richer visual representation of job categories or actions.\n  - The code structure remains largely unchanged with no alterations to line counts, indicating a focus on visual and aesthetic improvements rather than logic changes.\n- **setup.scss:**\n  - Updated the `.setup-jobs` class with a new gradient background from `135deg` to `273deg`, enhancing the visual appeal with a smoother and more modern look.\n  - Adjusted the position to absolute for better alignment and consistency across different screen sizes, improving overall layout stability.\n  - Added a blur effect with `backdrop-filter: blur(10px);` to create a soft, focused view, improving the user experience.\n  - Slight animation enhancements using `fadeIn` for smoother transitions, making the UI interactions feel more natural.\n\n- **billing.scss:**\n  - No significant changes were noted in terms of logic or functionality, focusing instead on maintaining existing style definitions across the billing page layout, ensuring consistency and adherence to the current design language.",
            "blurb": "Enhanced UI visuals and consistency across job setup and billing styles.",
            "tags": [
                "SetupMyJobs.jsx",
                "setup.scss",
                "billing.scss",
                "UI",
                "CSS",
                "Icons"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "fef3397b",
        "author": "Teddy Oweh",
        "date": "2025-02-26 00:19:46",
        "human_readable_date": "wednesday 26th february 2025 @ 12:19am",
        "message": "stable",
        "summary": {
            "summary": "Billing Page Enhancements:\n- **Billing Page Component**: Modifications in `billing/page.jsx` have expanded the file by five lines. Although the detailed changes within the component logic are not visible, the additional lines suggest enhancements or new features that require context management using `useContext` from `AppContext`.\n\n- **Styling Updates**: The `billing.scss` file has been extended with 15 new lines. These changes primarily focus on the `.billing-page` class to enhance the layout and styling:\n  - **Layout Flexibility**: Introduced `flex-direction: row` and `position: fixed` to maintain the layout across different screen sizes.\n  - **Design Consistency**: Utilized existing color variables like `$primary-color` and `$secondary-color` to ensure cohesive styling throughout the billing page.\n  - **Improved Responsiveness**: Adjustments for `.billpage-app` include column flex direction and scroll overflow, ensuring better usability on varied display sizes.",
            "blurb": "Updated the billing page for improved layout and styling.",
            "tags": [
                "billing/page.jsx",
                "billing.scss",
                "BillingPage",
                "AppContext"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "395e0eee",
        "author": "Teddy Oweh",
        "date": "2025-02-25 23:40:54",
        "human_readable_date": "tuesday 25th february 2025 @ 11:40pm",
        "message": "stable",
        "summary": {
            "summary": "**Register Page Updates:**\n- Migrated to a new authentication library by importing `useGoogleOneTapLogin` and `GoogleLogin` from `@react-oauth/google`. This change indicates a shift towards using OAuth for user authentication, potentially improving security and user experience.\n- Consolidated import statements, particularly for Google authentication components, suggesting a cleanup or refactor of the authentication integration.\n\n**Styling Adjustments:**\n- Commented out the `background-image` property in `auth.scss`, which might have been used to simplify the UI or address performance issues related to large image files. It maintains other background properties like size, position, and attachment to ensure a consistent layout.\n- Defined new Sass variables `$main-color` and `$main-color-light` to standardize theme colors across the application, promoting a consistent look and feel.",
            "blurb": "Updated register page to enhance Google authentication and refined UI styling for better performance.",
            "tags": [
                "register/page.js",
                "auth.scss",
                "useGoogleOneTapLogin",
                "GoogleLogin",
                "background-image"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "dbff5653",
        "author": "Teddy Oweh",
        "date": "2025-02-25 23:36:24",
        "human_readable_date": "tuesday 25th february 2025 @ 11:36pm",
        "message": "stable",
        "summary": {
            "summary": "### Social Login Enhancements:\n- Integrated `useGoogleOneTapLogin` from `@react-oauth/google`, allowing users to log in with a single tap using Google credentials. This enhances user experience by simplifying the login process and reducing friction.\n\n### Improved OAuth Support:\n- Updated imports to include both `GoogleOAuthProvider` and `GoogleLogin`, indicating a move towards a more robust handling of Google OAuth flows. This change supports future scalability and compatibility with Google's authentication ecosystem.\n\n### Consistency and Maintenance:\n- Ensured consistent use of `@react-oauth/google` imports, which aids in maintaining cleaner and more maintainable code by centralizing OAuth logic. This aligns with best practices for managing third-party authentication libraries.",
            "blurb": "Enhanced Google OAuth integration with one-tap login support and improved consistency.",
            "tags": [
                "register/page.js",
                "Google OAuth",
                "useGoogleOneTapLogin",
                "GoogleLogin"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "b4dbf9f1",
        "author": "Teddy Oweh",
        "date": "2025-02-25 23:35:04",
        "human_readable_date": "tuesday 25th february 2025 @ 11:35pm",
        "message": "stable",
        "summary": {
            "summary": "**Styling Updates in auth.scss:**\n- Introduced two new color variables: `$main-color` and `$main-color-light`, allowing for consistent theme management across the application.\n- Updated the `.auth` class to employ a full viewport height (`100vh`) and width (`100%`), ensuring the authentication component is centered and occupies the entire screen.\n- Removed the commented-out background image line to clean up the code.\n- Enforced several CSS properties like `background-size`, `background-position`, `background-repeat`, and `background-attachment` to enhance the visual presentation of the authentication screen with a fixed and centered background.",
            "blurb": "Updated the auth.scss file with new color variables and refined styling for better layout and theme consistency.",
            "tags": [
                "auth.scss",
                ".auth class",
                "CSS variables"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "ae4dbe5b",
        "author": "Teddy Oweh",
        "date": "2025-02-25 23:26:44",
        "human_readable_date": "tuesday 25th february 2025 @ 11:26pm",
        "message": "stable",
        "summary": {
            "summary": "### Onboarding Page Update:\n- **Imports:** Added import statements for various icons and components, such as `Send`, `ArrowRight`, and `Markdown`. These imports suggest enhancements to UI elements like buttons, navigation, and markdown rendering.\n- **Code Structure:** Maintained existing structure without line changes, indicating optimizations or refactoring within the same line count.\n\n### Registration Page Enhancements:\n- **Imports:** Included new imports for Google authentication components (`GoogleOAuthProvider`, `useGoogleOneTapLogin`, `GoogleLogin`) and `axios`, enhancing authentication capabilities with Google OAuth.\n- **Styling:** Integrated authentication styling with `auth.scss`, likely refining the user interface for registration pages.\n- **Context and State:** Continued use of `AppContext` and `useState`, ensuring state management and context usage are consistent and possibly optimized.\n\nOverall, these changes indicate an emphasis on enhancing user authentication and interface elements without altering the core logic or increasing file sizes.",
            "blurb": "Enhanced onboarding and registration pages with improved imports and Google OAuth integration.",
            "tags": [
                "onboarding page",
                "registration page",
                "Google OAuth",
                "UI components",
                "imports"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "32baf6a4",
        "author": "Teddy Oweh",
        "date": "2025-02-25 23:16:03",
        "human_readable_date": "tuesday 25th february 2025 @ 11:16pm",
        "message": "stable",
        "summary": {
            "summary": "Styling and Component Updates:\n\u2022 Modified `src/app/onboarding/page.jsx` to include new icon imports from the 'lucide-react' library, enhancing the visual elements available for use within the onboarding page. This change does not alter the line count, indicating the replacement or reorganization of existing code rather than the addition of new content.\n\n\u2022 Updated `src/app/styles/auth.scss` by uncommenting and adjusting the styling of the background image properties within the `.auth` class. This change may impact the visual appearance of the authentication page by ensuring the background image is consistently styled across different devices.\n\n\u2022 Made several updates to `src/app/styles/onboarding.scss`. This includes increasing the total line count, which suggests the addition of new style rules, such as specifying font family and adjusting the layout properties for improved user interface consistency. The changes aim to improve the styling and layout of the onboarding components, particularly within the `.onboarding-container` and `.conversation-container` classes.",
            "blurb": "Updated icon imports and improved styling in onboarding and auth components.",
            "tags": [
                "page.jsx",
                "auth.scss",
                "onboarding.scss",
                "lucide-react",
                "styling"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "fd3f5632",
        "author": "Teddy Oweh",
        "date": "2025-02-25 20:57:19",
        "human_readable_date": "tuesday 25th february 2025 @ 08:57pm",
        "message": "stable",
        "summary": {
            "summary": "### Onboarding Page Modifications:\n- **Imports Added:**\n  - Included various icons from 'lucide-react' such as `Send`, `ArrowRight`, `Sparkles`, etc., enhancing the page's iconography.\n\n### Register Page Enhancements:\n- **Google Authentication:**\n  - Integrated `GoogleOAuthProvider` and `GoogleLogin` from `@react-oauth/google` to enable Google-based user authentication, providing users with a seamless login experience.\n- **Styling and Assets:**\n  - Included a new logo asset and updated stylesheet imports to ensure consistent styling across the application.\n\n### Stylesheet Updates:\n- **Styling Enhancements:**\n  - Extended the `auth.scss` file with additional styles, adjusting color schemes and layout properties for improved visual design.\n  - Implemented a more comprehensive layout for the authentication pages, ensuring better alignment and responsiveness.\n  - The background styling was refined to provide a more polished look, with fixed positioning and enhanced background properties for the auth interface.",
            "blurb": "Enhanced onboarding and registration pages with new icons and Google login, plus major stylesheet updates.",
            "tags": [
                "page.jsx",
                "page.js",
                "auth.scss",
                "GoogleOAuthProvider",
                "GoogleLogin",
                "lucide-react",
                "styling"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "20bf39a1",
        "author": "Teddy Oweh",
        "date": "2025-02-25 15:19:28",
        "human_readable_date": "tuesday 25th february 2025 @ 03:19pm",
        "message": "stable",
        "summary": {
            "summary": "Dashboard Page Enhancements and Refactoring:\n\n\u2022 Modified `src/app/dashboard/page.js` to improve the client-side importing of icons and components. This includes adding a new set of imports from 'lucide-react' and 'recharts', allowing for a more diverse range of icons and responsive charting capabilities. This change should enhance the visual and interactive elements of the dashboard.\n\n\u2022 The file structure and import statements were adjusted for better readability and maintainability, although the total number of lines remained unchanged, suggesting a reorganization without significant additions or deletions to the code base.",
            "blurb": "Enhanced dashboard page with new icons and responsive charts for better user interaction.",
            "tags": [
                "dashboard/page.js",
                "lucide-react",
                "recharts",
                "icons",
                "charts"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "58061fe6",
        "author": "Teddy Oweh",
        "date": "2025-02-25 13:56:04",
        "human_readable_date": "tuesday 25th february 2025 @ 01:56pm",
        "message": "stable",
        "summary": {
            "summary": "### Import Updates:\n- Added new icons to the import statement from `lucide-react`. These include:\n  - `Microscope`\n  - `ShoppingBag`\n  - `Package`\n  - `ShoppingCart`\n  - `Pen`\n  - `Home`\n  - `Compass`\n  - `Truck`\n  - `Building`\n  - `Leaf`\n  - `Headphones`\n  - `Settings`\n  - `Wrench`\n  - `HardHat`\n  - `Clock`\n  - `FileText`\n  - `GraduationCap`\n\n### Impact:\n- These changes extend the component's visual capabilities by adding more icon options for UI elements, which can enhance user interaction and thematic design consistency.",
            "blurb": "Expanded icon imports in SetupAutopilot.jsx for richer UI design.",
            "tags": [
                "SetupAutopilot.jsx",
                "lucide-react",
                "icons"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "14fec90f",
        "author": "Teddy Oweh",
        "date": "2025-02-25 13:53:18",
        "human_readable_date": "tuesday 25th february 2025 @ 01:53pm",
        "message": "stable",
        "summary": {
            "summary": "Autopilot Setup Enhancements:\n\u2022 Expanded **SetupAutopilot.jsx** from 11 to 573 lines, incorporating a wide variety of new UI components and icons such as Search, Briefcase, and Rocket from lucide-react. This enriches the interface with enhanced visual elements.\n\n\u2022 Introduced a new file, **data.js**, likely containing configuration or data setup for the autopilot feature, signifying a modular approach to managing data.\n\n\u2022 Added a new stylesheet, **setup_autopilot.scss**, to define specific styles for the autopilot setup process, ensuring consistent visual styling and improved UI consistency.\n\nGeneral Codebase Updates:\n\u2022 Updated **page.jsx** with additional imports and components, suggesting new functionalities or UI updates, slightly increasing the file size to accommodate new features like Radar and Sparkles.\n\n\u2022 Modified **appContext.js** by adding new lines, indicating enhancements in state management or context handling, potentially improving data flow and state persistence across the application.\n\n\u2022 Minor updates in **dashboard/page.js** and **resume-store.scss** to improve styling or component import efficiency, ensuring optimized and up-to-date UI components.",
            "blurb": "Major updates to the Autopilot setup with new components and styles, alongside general enhancements across several files.",
            "tags": [
                "SetupAutopilot.jsx",
                "data.js",
                "setup_autopilot.scss",
                "appContext.js",
                "page.jsx",
                "dashboard/page.js",
                "resume-store.scss"
            ],
            "changes_type": [
                "added",
                "modified"
            ]
        }
    },
    {
        "commit_hash": "33e1ba90",
        "author": "Teddy Oweh",
        "date": "2025-02-24 07:59:12",
        "human_readable_date": "monday 24th february 2025 @ 07:59am",
        "message": "stable",
        "summary": {
            "summary": "### Billing Page Component Update:\n- **Imports Updated**: Added new SVG asset imports including American Express, MasterCard, and Visa logos. This enhances the visual representation of supported payment methods on the billing page.\n- **Icon Imports**: Included several icons from 'lucide-react' such as Star, Zap, Infinity, and others, likely for use in UI elements, improving user interaction and aesthetic appeal.\n- **Styling**: Continued usage of `billing.scss` for styling, ensuring consistent look and feel across billing-related components.\n\n### Impact:\nThese changes improve the billing page's UI by incorporating recognizable payment method icons and useful interactive icons, enhancing the user's visual experience and interaction with the billing system.",
            "blurb": "Updated the billing page with new payment method icons and interactive elements for a better user experience.",
            "tags": [
                "BillingPage",
                "SVG Imports",
                "Icon Imports",
                "Styling"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "95d6f9ae",
        "author": "Teddy Oweh",
        "date": "2025-02-24 07:51:40",
        "human_readable_date": "monday 24th february 2025 @ 07:51am",
        "message": "stable",
        "summary": {
            "summary": "Billing Page Enhancement:\n\u2022 Updated the `BillingPage` component in `page.jsx`, adding 14 new lines of code and modifying existing content. This change primarily involves integrating new vector icons from the `lucide-react` library, which enhances the visual representation of billing features. Icons such as `Star`, `Zap`, `Infinity`, `ChevronRight`, `Shield`, `Check`, and `Gauge` were imported and are likely used for UI elements that require these symbolic representations.\n\n\u2022 Incorporated SVG assets for major credit card companies, including American Express (`amex`), MasterCard (`mastercard`), and Visa (`visa`). This addition ensures that users can visually identify supported payment methods directly on the billing page, improving user experience and clarity.\n\n\u2022 Adjusted the context usage by importing `useContext` and `useMemo` from React, which are essential for managing and optimizing context-driven state changes. This adjustment may enhance performance by preventing unnecessary re-renders within the billing page component.\n\n\u2022 The use of the `\"use client\"` directive indicates that this component is intended to be rendered on the client side, which is critical for interactions that require immediate user feedback and dynamic content updates.",
            "blurb": "Enhanced the billing page with new icons and credit card visuals for a better user experience.",
            "tags": [
                "BillingPage",
                "Icons",
                "SVG Assets",
                "useContext",
                "useMemo"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "e394e53a",
        "author": "Teddy Oweh",
        "date": "2025-02-24 06:24:48",
        "human_readable_date": "monday 24th february 2025 @ 06:24am",
        "message": "stable",
        "summary": {
            "summary": "Billing Page UI Enhancement:\n- **Refactored Imports:** Organized and cleaned the import statements for better readability and maintainability. This includes separating third-party library imports from local components and assets.\n- **Client Directive:** Added `\"use client\"` directive at the top of the file, ensuring that the component is rendered on the client-side, which is essential for components that rely on browser APIs or context providers.\n- **Context Usage:** Utilized `useContext` hook to access `AppContext`, allowing the component to efficiently access the user's information for personalized billing details.\n\nStyling Improvements:\n- **SCSS Integration:** Linked the `billing.scss` stylesheet to enhance the billing page's appearance. This integration is crucial for maintaining a consistent look and feel across the application.\n\nIcon and Asset Management:\n- **Icon Imports:** Added imports for various icons from `lucide-react`, including `Star`, `Zap`, `Infinity`, `ChevronRight`, `Shield`, `Check`, and `Gauge`. These icons are likely used to visually represent billing features or statuses on the page.\n- **Credit Card Logos:** Imported American Express, MasterCard, and Visa SVG assets. These logos are essential for displaying accepted payment methods, improving user trust and clarity on payment options.",
            "blurb": "Enhanced the billing page with client-side rendering, improved styling, and organized imports for better maintainability.",
            "tags": [
                "BillingPage",
                "useContext",
                "billing.scss",
                "lucide-react",
                "SVG Assets"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "73574f6b",
        "author": "Teddy Oweh",
        "date": "2025-02-24 06:13:29",
        "human_readable_date": "monday 24th february 2025 @ 06:13am",
        "message": "stable",
        "summary": {
            "summary": "Billing Page Update:\n- The `billing/page.jsx` file was modified, though the number of lines remained the same at 206. The file imports various components and icons such as `MainSidebar`, `Star`, `Zap`, and others, along with images for payment methods like American Express, Mastercard, and Visa.\n\nOnboarding Stylesheet Adjustment:\n- In `styles/onboarding.scss`, three lines were added, changing the total from 2596 to 2599. The modifications included adjustments in the `.onboarding-container`, particularly setting the `font-family` to \"Google Sans\" and ensuring the layout's display properties like `flex` are correctly applied.",
            "blurb": "Updated billing page settings and enhanced onboarding styles.",
            "tags": [
                "billing/page.jsx",
                "styles/onboarding.scss",
                "MainSidebar",
                "AppContext",
                "Google Sans"
            ],
            "changes_type": [
                "modified"
            ]
        }
    },
    {
        "commit_hash": "81280e19",
        "author": "Teddy Oweh",
        "date": "2025-02-24 00:30:52",
        "human_readable_date": "monday 24th february 2025 @ 12:30am",
        "message": "stable",
        "summary": {
            "summary": "**Enhancements to Google Authentication on Register Page:**\n\n- **Google OAuth Integration:** Updated the `page.js` file to enhance Google authentication capabilities. The modifications now import and utilize `GoogleOAuthProvider`, `useGoogleOneTapLogin`, and `GoogleLogin` from `@react-oauth/google`. This provides a streamlined and secure way for users to log in using their Google accounts, improving user experience and security.\n\n- **Imports and Context Usage:** Several imports were maintained, including `axios` for HTTP requests, `api` and `endpoints` for server configuration, and `AppContext` for application-level state management. These ensure that the existing functionalities continue to operate seamlessly while integrating new features.\n\n- **No Structural Changes:** The number of lines in the file remains unchanged at 277, indicating that these enhancements were integrated without affecting the overall file structure.",
            "blurb": "Enhanced Google login on the register page with new OAuth features.",
            "tags": [
                "GoogleOAuthProvider",
                "useGoogleOneTapLogin",
                "GoogleLogin",
                "register/page.js"
            ],
            "changes_type": [
                "modified"
            ]
        }
    }
]

export { commitStore };