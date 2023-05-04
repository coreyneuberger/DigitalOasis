import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { frontpage, preview, popart } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'

const Home = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        prompt: '',
        image: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleRandomPrompt = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };


    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('https://digitaloasis-backend.up.railway.app/api/dalle2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                })

                const data = await response.json();

                setForm({ ...form, image: `data:img/jpeg;base64,${data.image}` });

            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please enter a prompt');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.image) {
            setLoading(true);
            try {
                const response = await fetch('https://digitaloasis-backend.up.railway.app/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });

                await response.json();
                navigate('/gallery');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };

    return (
        <section className="max-w-5xl mx-auto">
            <div className='px-20 pb-10 flex flex-row max-w-4xl'>
                <div className='flex flex-col gap-5 pr-10'>
                    <h1 className='text-[32px] text-onbackground'>Let AI Inspire Your <span className='text-primary'>Next Masterpiece</span></h1>
                    <p className='text-[14px] text-onbackground'>With our AI art generator, you can create endless possibilities of originals artwork in just a few clicks. Try it out now and see for yourself the power of AI in creating art!</p>
                </div>
                <div className=' flex flex-col hidden md:flex'>
                    <img src={frontpage} alt='photograph of an astronaut riding a horse' />
                    <p className='text-[12px] text-onbackground px-5'>"photograph of an astronaut riding a horse"</p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row-auto'>
                <form className="mt-16" onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <div>
                            <h1 className="font-extrabold text-onbackground text-[32px]" id="create">Create</h1>
                            <p className="mt-2 text-onbackground text-[14px] max-w-[500px]">Try our art generator to create your own unique artwork through DALL-E AI.</p>
                            <ul className='text-onbackground text-[14px] mt-2 list-disc list-inside'>
                                <li>Type in a prompt and click generate</li>
                                <li>Click "Random" to get a generated prompt</li>
                                <li className='mb-5'>Click "Share to the Gallery" to save your creation</li>
                            </ul>
                        </div>
                        {/*<div className='flex flex-col'>
                            <h1 className='font-extrabold text-onbackground text-[32px]'>Filters</h1>
                            <div className='flex row-auto'>
                                <img src={popart} alt='popart' className='max-w-32 max-h-32'></img>
                            </div>
                        </div>*/}
                        <FormField
                            LabelName="Prompt"
                            type="text"
                            name="prompt"
                            placeholder="Baseball player sliding into home base, digital art"
                            value={form.prompt}
                            handleChange={handleChange}
                            randomPrompt
                            handleRandomPrompt={handleRandomPrompt}
                        />
                        <div className='mt-5'>
                            <button
                                type="button"
                                onClick={generateImage}
                                className="bg-primary text-onprimary font-medium rounded-md w-full sm:w-atuo px-5 py-2.5 text-center"
                            >
                                {generatingImg ? 'Generating...' : 'Generate'}
                            </button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-primary text-onprimary font-medium rounded-md w-full sm:w-atuo px-5 py-2.5 text-center mt-5"
                            >
                                {loading ? 'Sharing...' : 'Share to the Gallery'}
                            </button>
                        </div>


                        <div className="mt-5 relative bg-back border-4 border-onbackground text-gray-900 text-sm rounded-lg p-3 flex justify-center items-center">
                            {form.image ? (
                                <img
                                    src={form.image}
                                    alt={form.prompt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-6/12 h-6/12 object-contain opacity-75"
                                />
                            )}

                            {generatingImg && (
                                <div className="absolute insert-0 z-0 flex justify-center items-center rounded-lg">
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Home
