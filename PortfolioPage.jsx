
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { motion } from "framer-motion";

function ProjectImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full mt-6">
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={\`Screenshot \${currentIndex + 1}\`}
          className="rounded-lg w-full max-w-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              →
            </button>
          </>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={\`Thumb \${idx + 1}\`}
            onClick={() => handleThumbnailClick(idx)}
            className={\`w-16 h-10 object-cover rounded border transition cursor-pointer \${idx === currentIndex ? "border-blue-500 opacity-100" : "border-gray-600 opacity-60 hover:opacity-100"}\`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    document.title = "Mian Hassan Sohail | Unity Developer";
  }, []);

  const projects = []; // <- You can reinsert your projects here

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <section className="py-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Mian Hassan Sohail
        </motion.h1>
        <p className="text-gray-400 text-lg mb-6">
          Senior Unity Developer | Metaverse, VR/AR, Multiplayer Games
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="secondary">
            <a href="mailto:hassansohail@live.com">Contact Me</a>
          </Button>
          <Button asChild>
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-900">
        <h2 className="text-2xl font-semibold mb-8 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6 animate-fade-slide">
          {projects.map((project, index) => (
            <Card key={index} onClick={() => setOpenProject(project)} className="cursor-pointer">
              <CardContent className="p-0">
                {project.preview.endsWith(".mp4") ? (
                  <video src={project.preview} className="rounded-t-lg w-full" autoPlay loop muted />
                ) : (
                  <img src={project.preview} alt={project.title} className="rounded-t-lg w-full" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3">{project.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {openProject && (
        <Dialog open={true} onOpenChange={() => setOpenProject(null)}>
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4">
            <div className="bg-gray-900 rounded-xl max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
              <button className="absolute top-4 right-4 text-white" onClick={() => setOpenProject(null)}>
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4">{openProject.title}</h3>
              {openProject.video && (
                <video className="mb-4 rounded-lg w-full" controls>
                  <source src={openProject.video} type="video/mp4" />
                </video>
              )}
              {openProject.link && (
                <p className="mb-4 text-blue-400">
                  <a href={openProject.link} target="_blank" rel="noopener noreferrer" className="underline">
                    Visit Site
                  </a>
                </p>
              )}
              <div className="whitespace-pre-wrap text-gray-300 text-sm mb-4">{openProject.fullDesc}</div>
              {openProject.images?.length > 0 && (
                <ProjectImageSlider images={openProject.images} />
              )}
            </div>
          </div>
        </Dialog>
      )}
    </main>
  );
}
