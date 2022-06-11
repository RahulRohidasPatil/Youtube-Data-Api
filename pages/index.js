import Image from "next/image";
import { useState } from "react";

//To fetch all videos stored in a database
export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3000/api/getvideos");
  const videos = await response.json();
  videos.sort((a, b) => {
    if (b.publishTime < a.publishTime) return -1;
    else if (b.publishTime > a.publishTime) return 1;
    return 0;
  });
  return {
    props: { videos }, // will be passed to the page component as props
  }
}

//Main Component
export default function Home({ videos }) {
  const [pageno, setPageno] = useState(1); //To track page number within a page
  const totalPages = Math.ceil(videos.length / 10); //Calculate total pages required for pagination
  const startIndex = pageno * 10 - 10; //calculate startIndex of array of videos according to current page number
  const paginatedVideos = videos.slice(startIndex, startIndex + 10);

  //when user clicks the button of previous page
  function previousPage() {
    if (pageno > 1) setPageno(pageno - 1);
    else alert("Already on First Page");
  }

  //when user clicks the button of next page
  function nextPage() {
    if (pageno < totalPages) setPageno(pageno + 1);
    else alert("Already on Last Page");
  }

  //when user searches by title
  function onSearchByTitles() {
    const searchQuery = document.getElementById("searchTitleQuery");
    const titles = document.getElementsByClassName("titleText");
    for (const title of titles) {
      if (`${title.innerText}`.search(`${searchQuery.value}`) === -1) title.parentElement.parentElement.parentElement.style.display = "none";
      else title.parentElement.parentElement.parentElement.style.display = "flex";
    }
  }

  //when user searches by description
  function onSearchByDescription() {
    const searchQuery = document.getElementById("searchDescriptionQuery");
    const descriptions = document.getElementsByClassName("descriptionText");
    for (const description of descriptions) {
      if (`${description.innerText}`.search(`${searchQuery.value}`) === -1) description.parentElement.parentElement.parentElement.style.display = "none";
      else description.parentElement.parentElement.parentElement.style.display = "flex";
    }
  }

  return <>
    <div className="search flex space-x-2 justify-center p-1">
      <input id="searchTitleQuery" className="w-2/3 border border-black p-1" type="text" placeholder="Search Titles" />
      <button className="bg-slate-400 p-1" onClick={onSearchByTitles}>Search</button>
    </div>
    <div className="search flex space-x-2 justify-center p-1">
      <input id="searchDescriptionQuery" className="w-2/3 border border-black p-1" type="text" placeholder="Search Descriptions" />
      <button className="bg-slate-400 p-1" onClick={onSearchByDescription}>Search</button>
    </div>
    {paginatedVideos.map(video => {
      return <div key={video._id} className="p-1 flex">
        <Image src={video.thumbnailUrl} alt="Thumbnail" width="320" height="180" />
        <div className="w-full ml-1 flex flex-col justify-center">
          <div className="title"><span className="font-black">Title: </span><span className="titleText">{video.title}</span></div>
          <div className="description"><span className="font-black">Description: </span><span className="descriptionText">{video.description}</span></div>
          <div className="channelTitle"><span className="font-black">Channel Title: </span>{video.channelTitle}</div>
          <div className="publishTime"><span className="font-black">Publish Time: </span>{new Date(video.publishTime).toString()}</div>
        </div>
      </div>
    })}
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center justify-center">
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm space-x-2" aria-label="Pagination">
            <a onClick={previousPage} className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>Previous Page
            </a>
            <span className="pt-1">Page {pageno}</span>
            <a onClick={nextPage} className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>Next Page
            </a>
          </nav>
        </div>
      </div>
    </div>
  </>
}
