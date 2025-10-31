import { Box } from "@mui/joy";
import React, { memo, useCallback } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import FileLink from "../../../assets/images/pdfSvg2.svg";
// import { NAS_FLDR } from "../../../Constant/Static";
// import axiosApi from "../../../Axios/Axios";
// import JSZip from "jszip";
// import FileDisplayModal from "./FileDisplayModal";

const FileList = ({ data, setLink }) => {


  // console.log("data:::::::::", data);


  const { doc_number, filename, url, type } = data;
  // const NasFileLink = `${NAS_FLDR}${doc_number}/${filename}`;

  // const [UploadedImages, setUploadedImages] = useState([])

  const handleSetPdfImage = useCallback(() => {
    setLink(data);
  }, [data]);

  // const FetchFiles = useCallback(() => {
  //   // setOpenFile(true)
  //   const getImage = async (doc_number, filename) => {
  //     try {
  //       const result = await axiosApi.get(`/docMaster/getFiles/${doc_number}/${filename}`, {
  //         responseType: 'blob'
  //       });
  //       // console.log(result);

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         // Extract image files (e.g., .jpg, .png)
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );
  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           // Get the original blob (no type)
  //           const originalBlob = await fileObj.async('blob');
  //           // Determine MIME type based on filename extension (or any other logic)
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setLink(images[0])
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //     }
  //   }
  //   getImage(doc_number, filename)
  // }, [doc_number, filename, setLink])

  // console.log("UploadedImages:", UploadedImages);




  return (
    <Box className="p-1 border-[0.5px] rounded-md h-16 flex flex-1 flex-row mb-1 bg-bgcard border-borderprimary">
      {/* <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} /> */}
      <Box
        className="flex  
        w-12 rounded-md items-center justify-center cursor-pointer 
        hover:bg-baseWhite/85 
        bg-baseWhite/60
        drop-shadow-md "
        onClick={handleSetPdfImage}
      // onClick={FetchFiles}
      >
        <img
          alt="upload image"
          src={type === "application/pdf" ? FileLink : url}
          width={50}
          height={50}
          className="p-[0.290rem] rounded-md object-contain"
          onContextMenu={(e) => e.preventDefault()}
        />
      </Box>
      <Box className="flex flex-auto rounded-md flex-col pl-2" >
        {/* <Typography color="primary" className="line-clamp-1" >sdfsdfsdfffffffffffffffffffffffffffffffffsdasdasdasffffffffffsssssssssssssss ddddddddddddddd</Typography> */}
        <CustomTypo
          label={filename}
          style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)', paddingY: 0, }}
        />
        <CustomTypo
          label={doc_number}
          style={{
            fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
            paddingY: 0,
            // textTransform: "uppercase",
            fontWight: 900,
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(FileList);
