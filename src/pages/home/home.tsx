import { Auth } from "widget/auth";

import { Layout } from "pages/ui/layout";

export const Home = () => {
  return (
    <Layout>
      <div>
        <Auth />
      </div>
    </Layout>
  );
};
