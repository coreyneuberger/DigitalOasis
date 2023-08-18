import React, {useState, useEffect} from "react";

import {Loader, Card, FormField} from "../components";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.map((post) => <Card key={post._id} {...post} />)
      );
    }
  
    return (
      <h2 className="mt-5 font-bold text-primary text-xl uppercase">{title}</h2>
    );
  };


const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);


    const fetchPosts = async () => {
        setLoading(true);
    
        try {
          const response = await fetch("/api/posts", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const result = await response.json();
            setAllPosts(result.data.reverse());
          }
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);

      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
          setTimeout(() => {
            const searchResult = allPosts.filter((post) => post.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedResults(searchResult);
          }, 500)
        )
        
      };



    return (
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-onbackground text-[32px]">Gallery</h1>
          <p className="mt-2 text-onbackground text-[14px] max-w-[500px]">Check out the cool images!</p>
        </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-onbackground text-xl mb-3">
                Showing Resuls for... <span className="text-onbackground">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>


        /*<section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-onbackground text-[32px]">Gallery</h1>
          <p className="mt-2 text-onbackground text-[14px] max-w-[500px]">Check out the cool images!</p>
        </div>
  
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                <RenderCards data={allPosts} title="No posts yet" />
              </div>
          )}
        </div>
      </section>*/
    );
};

export default Gallery
