import { useBackgroundId } from "../contexts/BackgroundIdContext";
import Header from "./Header";
import BoardLayout from "./BoardLayout";
import Footer from "./Footer";
import ToastContainer from "./ToastContainer";
import { backgrounds } from "../constants/backgrounds";

const AppLayout = () => {
	const { backgroundId } = useBackgroundId();

	return (
		<div
			className={`app-layout w-screen h-screen ${
				backgrounds.find((background) => background.id === backgroundId)?.bgStyles
			} bg-cover bg-center max-md:max-h-[calc(100vh-4rem)]`}>
			<Header />

			<BoardLayout />

			<Footer />

			<ToastContainer />
		</div>
	);
};

export default AppLayout;
