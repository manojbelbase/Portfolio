import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - Manoj Belbase";
  }, []);

  return (
    <div className="max-w-[800px] mx-auto min-h-screen text-gray-300 leading-relaxed font-sans py-8">
      <h1 className="text-3xl font-extrabold text-white mb-6">Terms of Service</h1>
      <p className="text-xs text-gray-400 mb-8 font-mono">Last Updated: June 24, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">1. Terms</h2>
        <p className="mb-4">
          By accessing the website at Manoj Belbase Portfolio, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials (information or software) on Manoj Belbase Portfolio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on Manoj Belbase Portfolio's website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p className="mb-4">
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by Manoj Belbase Portfolio at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on Manoj Belbase Portfolio's website are provided on an 'as is' basis. Manoj Belbase Portfolio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p className="mb-4">
          Further, Manoj Belbase Portfolio does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">4. Limitations</h2>
        <p className="mb-4">
          In no event shall Manoj Belbase Portfolio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Manoj Belbase Portfolio's website, even if Manoj Belbase Portfolio or a Manoj Belbase Portfolio authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">5. Accuracy of Materials</h2>
        <p className="mb-4">
          The materials appearing on Manoj Belbase Portfolio's website could include technical, typographical, or photographic errors. Manoj Belbase Portfolio does not warrant that any of the materials on its website are accurate, complete or current. Manoj Belbase Portfolio may make changes to the materials contained on its website at any time without notice. However Manoj Belbase Portfolio does not make any commitment to update the materials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">6. Links</h2>
        <p className="mb-4">
          Manoj Belbase Portfolio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Manoj Belbase Portfolio of the site. Use of any such linked website is at the user's own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">7. Modifications</h2>
        <p className="mb-4">
          Manoj Belbase Portfolio may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">8. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
