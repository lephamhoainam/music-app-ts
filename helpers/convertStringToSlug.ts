import unidecode from "unidecode";

export const convertStringToSlug = (text: string): string => {
    const unidecodeText = unidecode(text); // Chuyển chuỗi từ có dấu thành không dấu
    const slugTrim: string = unidecodeText.trim(); // Bỏ khoảng trắng ở đầu và cuối chuỗi
    const slug: string = slugTrim.replace(/\s+/g, '-'); // Thêm dấu - ở khoảng trắng giữa các từ trong chuỗi
    return slug;
}