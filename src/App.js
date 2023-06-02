import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useEffect, useState } from "react";

// Put your builder API key here
builder.init('bdd342f410124e3dbf855b5f774a1c0a')

function App() {

    // set whether you're using the Visual Editor,
    // whether there are changes,
    // and render the content if found
      const isPreviewingInBuilder = useIsPreviewing();
      const [notFound, setNotFound] = useState(false);
      const [content, setContent] = useState(null);

      // get the page content from Builder
      useEffect( () => {
        async function fetchContent() {
          const content = await builder.get('page', {
            url: window.location.pathname
          }).promise();
          
          //dynamically renders tab title from builder.io page field 
          document.title = content.data.title;

          setContent(content);
          setNotFound(!content);
        }
        fetchContent();
      }, []);

      // if no page is found, return a 404 page
      if (notFound && !isPreviewingInBuilder) {
        return <div>Not Found 404 Error</div>
      }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={content} />
    </>
  );
}

export default App;