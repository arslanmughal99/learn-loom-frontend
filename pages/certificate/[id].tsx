/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext, NextPage } from "next";

import { Certificate } from "../../typings/certificate";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ViewCertificateProps {
  certificate: Certificate;
}

const ViewCertificate: NextPage<ViewCertificateProps> = ({ certificate }) => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="flex justify-between flex-col h-[1200px] w-[900px] border rounded-xl overflow-hidden bg-[url('/img/certificate_grung.png')]">
        <div className="gap-y-11 flex flex-col items-center p-24">
          <div>
            <img
              alt="logo"
              className="w-44 h-auto"
              src="/img/certificate_logo.png"
            />
          </div>
          <h2 className="font-extrabold text-7xl text-primary">CERTIFICATE</h2>
          <div className="text-center">
            <p>This certificate is presented to:</p>
            <h3 className="text-3xl font-semibold">
              {certificate.user.firstName} {certificate.user.lastName}
            </h3>
          </div>
        </div>
        <div className="h-[50%] space-y-6 bg-gradient-to-r from-yellow-500 to-amber-500 p-16">
          <p className="text-center text-lg text-white/90">
            Who has successfully completed the course
          </p>
          <h3 className="mx-auto w-[600px] text-center text-4xl font-semibold text-white">{`"${certificate.course.title}"`}</h3>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(cx: GetServerSidePropsContext) {
  if (!cx.params || !cx.params.id) {
    return {
      notFound: true,
    };
  }

  const certificateId = cx.params.id;

  const url = endpoint + "/certificate/" + certificateId;
  const resRaw = await fetch(url);
  const res = await resRaw.json();

  return {
    props: { certificate: res },
  };
}

export default ViewCertificate;
