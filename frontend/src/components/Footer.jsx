import swoop from "/footer-swoop.svg";
import swoop2 from "/footer-swoop2.svg";
import dottedLine from "/soMeIcons/dottedLine.svg";

import data2 from "../data.en.json";
import { Slideshow } from "./WhyUsSlideshow";

export const Footer = ({ providedData, aboveColor }) => {
  let data = null;

  const previousSectionColor = aboveColor
    ? `bg-main-${aboveColor} w-full`
    : `w-full`;

  if (!providedData) data = data2.homepage.footer;
  else data = providedData;

  const missionStatement = data.missionStatement;
  const contact = data.contactInfo;

  const perkArray = missionStatement.perks;

  return (
    <>
      <img className={previousSectionColor} src={swoop2} alt="Section border" />
      <section className="mission bg-main-green">
        <div className=" text-text-light">
          <div className="p-6 tablet:p-10 laptop:p-20">
            <div className="flex mb-8 items-end justify-center">
              <h2 className="font-heading text-4xl">
                {missionStatement.title}
              </h2>
            </div>

            <Slideshow items={perkArray} />
            <div className="grid grid-cols-2 ">
              {missionStatement.perks &&
                missionStatement.perks.map((item, index) => (
                  <div
                    key={index}
                    className="text-center my-8 hidden laptop:block"
                  >
                    <h3 className="font-heading text-2xl my-2">{item.perk}</h3>
                    <p className="hidden font-extralight w-[45ch] tablet:block m-auto">
                      {item.comment}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <img
          className="w-3/4 h-0.5 m-auto object-cover bg-main-green"
          src={dottedLine}
          alt="Section border"
        />
      </section>

      <section className="contact bg-main-green text-text-light">
        <h2 className="font-heading text-4xl text-center py-10">
          {contact.title}
        </h2>

        <div className="flex whitespace-pre text-body flex-col items-center laptop:flex-row laptop:justify-around laptop:w-2/3 laptop: m-auto gap-4 align-center my-10">
          {contact.contactRoute.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-1/5 my-6">
              <img className="w-12 my-4" src={item.icon} alt={item.altText} />
              <p className="text-center font-extralight">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-8 justify-center py-10">
          {contact.socialMedia.map((item, index) => (
            <img
              key={index}
              className="w-10 hover:opacity-75 hover:cursor-pointer active:opacity-50"
              src={item.icon}
              alt={item.altText}
            />
          ))}
        </div>
      </section>
    </>
  );
};
