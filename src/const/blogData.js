export const blogData = [
  {
    id: "understanding-react-19-server-actions",
    title: "Understanding React 19 Server Actions: A Complete Guide",
    summary: "React 19 introduces Server Actions to simplify data mutations and state management between client and server. Learn how to implement them with practical examples.",
    category: "React",
    readTime: "6 min read",
    date: "June 15, 2026",
    content: `React 19 has officially introduced **Server Actions**, representing one of the most significant paradigm shifts in modern full-stack React development. By allowing developers to define server-side functions that can be invoked directly from the client, React is closing the gap between frontend interfaces and backend databases.

### What are Server Actions?
Traditionally, updating data in a database from a React application required setting up an API endpoint (such as an Express route or a Next.js API handler), writing a fetch request on the client, managing loading/error states manually, and then parsing the response.

Server Actions allow you to run server-side code without having to manually build API endpoints. They integrate directly with React's form actions and state management hooks.

### Basic Syntax
A Server Action is defined by placing the \`"use server"\` directive at the top of an async function.

\`\`\`javascript
// actions.js
"use server";

export async function createFeedback(formData) {
  const comment = formData.get("comment");
  // Save to database
  await db.feedback.create({ data: { comment } });
}
\`\`\`

### Form Integration
Once defined, you can pass this action directly to the \`action\` attribute of an HTML form element:

\`\`\`javascript
// FeedbackForm.jsx
import { createFeedback } from "./actions";

export default function FeedbackForm() {
  return (
    <form action={createFeedback}>
      <textarea name="comment" required />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}
\`\`\`

React automatically handles the form submission, prevents the default page reload, and invokes the server-side action securely.

### Managing Loading States: \`useActionState\`
React 19 introduces the \`useActionState\` hook (previously known as \`useFormState\` in canary versions) to track submission status, retrieve the action response, and show pending loaders.

\`\`\`javascript
import { useActionState } from "react";
import { createFeedback } from "./actions";

export default function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(createFeedback, null);

  return (
    <form action={formAction}>
      <textarea name="comment" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Feedback"}
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
\`\`\`

### Key Benefits
1. **Zero Client-Side JavaScript for Basic Submissions**: If a user has javascript disabled, standard forms using Server Actions can still submit data.
2. **Simplified Codebase**: You don't need to write fetch boilerplate code or manage routing configurations for simple database updates.
3. **Built-in Security**: Server Actions are compiled into secure POST endpoints automatically under the hood, preventing code leakage to the client.

### Conclusion
React 19 Server Actions are not just syntactical sugar; they represent a unified model for full-stack application development. By combining client-side reactivity with secure, direct database operations, developers can create faster, more maintainable apps with significantly less boilerplate.`
  },
  {
    id: "optimizing-web-vitals-in-vite-react-apps",
    title: "Optimizing Core Web Vitals in Vite and React Applications",
    summary: "Slow page load times hurt SEO and AdSense approval. Discover practical techniques to optimize LCP, FID, and CLS in Vite-powered React apps.",
    category: "Performance",
    readTime: "8 min read",
    date: "June 10, 2026",
    content: `Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. When applying for Google AdSense, a high performance score and good Core Web Vitals are critical for swift approval.

### 1. Largest Contentful Paint (LCP)
LCP measures perceived load speed. It marks the point in the page load timeline when the page's main content has likely loaded.

#### Code Splitting & Lazy Loading
In a large React application, loading the entire bundle upfront delay LCP. Use React's lazy loading functionality to split your bundle:

\`\`\`javascript
import { lazy, Suspense } from "react";

const RichDashboard = lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <RichDashboard />
    </Suspense>
  );
}
\`\`\`

By splitting pages into dynamic chunks, the initial bundle size remains small, resulting in much faster initial load times.

### 2. Interaction to Next Paint (INP)
INP (which replaced First Input Delay or FID in 2024) measures page responsiveness. It quantifies how long it takes for a user to see visual feedback after clicking, tapping, or pressing a key.

#### Avoid Blocking the Main Thread
Heavy computations should be offloaded or wrapped using \`useMemo\` and \`useCallback\`. For complex data manipulation, consider utilizing Web Workers:

\`\`\`javascript
// worker.js
self.onmessage = function(e) {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};
\`\`\`

Using Web Workers keeps the UI thread buttery smooth, lowering INP.

### 3. Cumulative Layout Shift (CLS)
CLS measures visual stability. It quantifies how much elements on the screen move while the page loads.

#### Set Explicit Image Dimensions
To prevent elements from jumping around when an image finishes loading, always set explicit width and height attributes or allocate aspect-ratio styles in CSS:

\`\`\`html
<img src="profile.jpg" width="300" height="300" alt="Profile" />
\`\`\`

Alternatively, write responsive CSS layouts:

\`\`\`css
.image-container {
  aspect-ratio: 16 / 9;
  background-color: #1a1a1a; /* Placeholder skeleton background */
}
\`\`\`

### 4. Vite Specific Tweaks
Vite is incredibly fast, but you can configure it further for optimal performance. Adjust the CSS code splitting and asset compression inside \`vite.config.js\`:

\`\`\`javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  }
});
\`\`\`

### Conclusion
Improving Core Web Vitals is not just about scoring 100 on Lighthouse; it is about providing an uninterrupted experience for your visitors. When search engines and AdSense crawlers see a fast, visually stable site, they prioritize it in search rankings and reward it with higher ad impressions.`
  },
  {
    id: "clean-architecture-in-node-express-apis",
    title: "Implementing Clean Architecture in Node.js and Express APIs",
    summary: "Building scalable and testable backend services using Clean Architecture principles. Learn how to decouple your routing, controllers, and database logic.",
    category: "Backend",
    readTime: "7 min read",
    date: "June 05, 2026",
    content: `When building backend applications using Node.js and Express, it is easy for controllers to grow into monolithic structures that handle validation, business logic, routing, and database transactions all at once. Applying Clean Architecture solves this by keeping core business rules isolated from external frameworks.

### The Core Principles of Clean Architecture
The primary rule of clean architecture is the **Dependency Rule**: source code dependencies must point inwards. Code in inner circles should have no knowledge of functions in outer circles.

1. **Entities**: Core business objects and models.
2. **Use Cases**: Business logic rules specific to the application.
3. **Controllers/Adapters**: Translates data between the Use Cases and the Web Framework/Database.
4. **Frameworks/Drivers**: Express router, Sequelize/Prisma ORM, third-party libraries.

### Folder Structure
Here is a recommended Clean Architecture folder layout:

\`\`\`text
src/
├── entities/       # Business objects
├── use-cases/      # Application workflows
├── controllers/    # Express controllers (adapters)
├── repositories/   # Database access interfaces
└── infrastructure/ # Express configuration, DB connections
\`\`\`

### Step-by-Step Implementation

#### 1. Define the Entity
An entity represents the pure domain rules. It shouldn't depend on MongoDB, PostgreSQL, or any framework.

\`\`\`javascript
class User {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  isValidEmail() {
    return this.email.includes("@");
  }
}
\`\`\`

#### 2. Create the Repository Interface
Repositories define the operations database clients must support. We define standard interfaces that adapters must implement.

\`\`\`javascript
// abstract class or interface representation
class UserRepository {
  async save(user) { throw new Error("Method not implemented"); }
  async findByEmail(email) { throw new Error("Method not implemented"); }
}
\`\`\`

#### 3. Implement the Use Case
The Use Case orchestrates data flow to and from entities. It depends on repository interfaces, not concrete databases.

\`\`\`javascript
class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = new User(userData);
    if (!user.isValidEmail()) {
      throw new Error("Invalid Email");
    }
    return await this.userRepository.save(user);
  }
}
\`\`\`

#### 4. The Controller Adapter
The controller acts as the entry point from Express. It extracts inputs, routes them to the use case, and maps the output back to HTTP responses.

\`\`\`javascript
class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(req, res) {
    try {
      const result = await this.createUserUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
\`\`\`

### Benefits of this Approach
- **Framework Independence**: You can swap Express for Fastify, NestJS, or even a serverless function without rewriting business logic.
- **Database Independence**: Swapping MongoDB for PostgreSQL only requires rewriting the repository implementation.
- **Testability**: You can write unit tests for Use Cases and Entities without mocking databases or HTTP requests.

### Final Thoughts
Clean Architecture might feel like boilerplate at first, but it pays off rapidly when your codebase grows. It provides a reliable structure that remains scalable, readable, and highly testable over years of active development.`
  },
  {
    id: "mastering-tailwind-css-custom-themes",
    title: "Mastering Tailwind CSS: Advanced Custom Themes and Design Tokens",
    summary: "Go beyond standard Tailwind utilities. Learn how to configure a custom color palette, responsive typography, and consistent design tokens for professional websites.",
    category: "CSS",
    readTime: "5 min read",
    date: "May 28, 2026",
    content: `Tailwind CSS has become the industry standard for fast frontend styling. However, using Tailwind's default configuration can make your website look identical to thousands of other platforms. To create a unique, premium design that stands out to users and AdSense review teams, we need to master theme customization.

### Customizing tailwind.config.js
The key to design consistency lies in configuring your tokens. By defining custom colors, font families, and responsive spacing, you make styling easier and more uniform.

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f3f4f6',
          DEFAULT: '#10b981',
          dark: '#065f46',
        },
        secondary: '#3b82f6',
        neutral: {
          850: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    }
  }
}
\`\`\`

### Creating a Premium Glassmorphism Effect
Glassmorphism adds a sleek, modern touch to elements like navigation menus and card containers. You can easily build it using standard Tailwind backdrop filters:

\`\`\`html
<div className="bg-[#1e2226]/80 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl p-6">
  <h3 className="text-white text-lg font-bold">Premium Container</h3>
  <p className="text-gray-300">Sleek transparency with perfect contrast.</p>
</div>
\`\`\`

### Smooth Transitions and Micro-Animations
Micro-animations improve engagement by reacting to hover and tap events. Combined with custom transitions, they give your site a premium feel:

\`\`\`html
<button className="bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 px-4 py-2 rounded-lg text-white">
  Hover Me
</button>
\`\`\`

### Custom Fonts and Styling Hierarchy
Avoid utilizing default fallback serif fonts. Instead, pull rich web fonts via Google Fonts and map them to your utility classes. Ensure heading hierarchies (\`h1\`, \`h2\`, \`h3\`) maintain distinct line-heights and font weights for comfortable reading.

### Summary
Customizing Tailwind CSS turns a basic CSS generator into a powerful, custom design system. Taking the time to adjust configuration tokens allows you to deploy stunning, highly polished web projects that look distinct and premium.`
  },
  {
    id: "how-to-implement-seo-in-single-page-applications",
    title: "How to Implement SEO Best Practices in Single Page Applications",
    summary: "Single Page Apps (SPAs) are notoriously difficult to index. Learn how to configure meta tags, routing, and schema markup to pass Google search guidelines.",
    category: "SEO",
    readTime: "9 min read",
    date: "May 20, 2026",
    content: `Google AdSense is deeply integrated with Google Search. If your website is not properly indexed, AdSense will reject your application for lack of content and crawlability. For developers building Single Page Applications (SPAs) with React or Vue, search optimization comes with unique hurdles.

### The SPA Problem
By default, an SPA returns a single \`index.html\` file with an empty container:

\`\`\`html
<div id="root"></div>
\`\`\`

The entire website is rendered dynamically in the browser via Javascript. When a search engine bot requests the page, it might only read the empty HTML container, leaving your rich content completely invisible to indexers.

### Solution 1: React Helmet Async
To dynamically inject page-specific titles, meta descriptions, and open-graph tags on the client, use \`react-helmet-async\`:

\`\`\`javascript
import { Helmet } from "react-helmet-async";

export default function ArticlePage({ article }) {
  return (
    <>
      <Helmet>
        <title>{article.title} | Manoj Belbase</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.coverImage} />
        <link rel="canonical" href={\`https://manojbelbase.com/blog/\${article.id}\`} />
      </Helmet>
      
      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
    </>
  );
}
\`\`\`

### Solution 2: Static Prerendering (SSG)
For websites that don't change content dynamically per millisecond (like portfolios and blogs), **SSG** is the ideal solution. If you use Vite, look into plugins like \`vite-plugin-prerender\` or compile structures into static HTML files during the build phase.

Alternatively, migrating to **Next.js** resolves this entirely by generating HTML on the server.

### Solution 3: Structured Data (JSON-LD)
Schema markup helps Google search crawlers interpret the intent of your site. You should embed JSON-LD structured data for article or person schema inside the header:

\`\`\`javascript
const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": article.title,
  "description": article.summary,
  "author": {
    "@type": "Person",
    "name": "Manoj Belbase"
  }
};

// Render inside component:
<script type="application/ld+json">
  {JSON.stringify(schema)}
</script>
\`\`\`

### Essential Checklist for AdSense Indexing
1. **Robots.txt**: Ensure your routes aren't blocked from crawler indexing.
2. **Sitemap.xml**: Provide a clear map of all dynamic URLs on your domain.
3. **Friendly URL Routing**: Avoid hash routers (\`/#/blog\`). Use clean URLs (\`/blog/article-name\`) using History API routing.

Implementing these guidelines will make your React SPA crawlable, ensuring quick indexing and smooth AdSense verification.`
  }
];
