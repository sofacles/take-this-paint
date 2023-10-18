import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToggleContent } from "./ToggleContent";
import { ThirdColorProvider } from "./ThirdColor/ThirdColorContext";
import SelectOtherInput from "./select-other-input/SelectOtherInput";
import ColorPicker from "./ColorPicker";
import Modal from "./Modal";
import { RgbDisplay } from "./RgbDisplay";
import { RgbIcon } from "./RgbIcon";
import UseForm from "./UseForm";
import ValidationRulesObj from "./PaintFormValidationRules";

import { v4 as uuidv4 } from "uuid";
import querystring from "querystring";

interface KeyValueCollection {
  [key: string]: string;
}

const GiveAwayPaint = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });

  const onValidationSuccess = async (fields: KeyValueCollection) => {
    let formData = new FormData();
    formData.append("imageName", uuidv4());
    formData.append("uploadPhoto", image.data);

    let qs = querystring.encode(fields);
    const response = await fetch(`/api/paints/?${qs}`, {
      method: "POST",
      body: formData,
    });
    if (response && response.status === 200) {
      navigate("/thank-you");
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const { setField, blurField, errors, handleSubmit } = UseForm(
    onValidationSuccess,
    ValidationRulesObj
  );
  const onColorSelected = (color: string) => {
    setField({
      target: {
        name: "rgb",
        value: color,
      },
    });
  };

  return (
    <div>
      <form
        name="give-away-paint"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
        className="donate-paint"
      >
        <h2>I want to give away some paint!</h2>

        <Link to="/view-paints">Back to Paints</Link>
        <SelectOtherInput
          id="brand"
          onNewValue={(newValue) => {
            setField({
              target: {
                name: "brand",
                value: newValue,
              },
            });
          }}
          onBlur={(e) => {
            blurField(e);
          }}
          initialValues={[
            "- choose -",
            "Sherwin-Williams",
            "Farrow & Ball",
            "Miller",
            "Behr",
            "Dunn-Edwards",
            "Glidden",
            "Rodda",
            "Benjamin Moore",
            "other",
          ]}
          label="Brand:"
        />
        {errors.brand && (
          <p className="error">
            <span>{errors.brand}</span>
          </p>
        )}

        <label htmlFor="name">Color Name:</label>
        <input
          name="name"
          id="name"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e);
          }}
        />
        {errors.name && (
          <p className="error">
            <span>{errors.name}</span>
          </p>
        )}

        <SelectOtherInput
          id="quantity"
          onNewValue={(newValue) => {
            setField({
              target: {
                name: "quantity",
                value: newValue,
              },
            });
          }}
          onBlur={(e) => {
            blurField(e);
          }}
          initialValues={[
            "- choose -",
            "about a quart",
            "less than a gallon",
            "less than two gallons",
            "less than five gallons",
            "other",
          ]}
          label="Quantity:"
        />

        {errors.quantity && (
          <p className="error">
            <span>{errors.quantity}</span>
          </p>
        )}

        <label htmlFor="sheen">Sheen:</label>
        <select
          name="sheen"
          id="sheen"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e);
          }}
        >
          <option value="">--</option>
          <option value="flat">flat</option>
          <option value="eggshell">eggshell</option>
          <option value="semi">semi gloss</option>
          <option value="gloss">high gloss</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e);
          }}
        />
        {errors.email && (
          <p className="error">
            <span>{errors.email}</span>
          </p>
        )}

        <label htmlFor="confirmEmail">Confirm Email:</label>
        <input
          name="confirmEmail"
          id="confirmEmail"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e, true);
          }}
        />
        {errors.confirmEmail && (
          <p className="error">
            <span data-testid="confirm-email-error">{errors.confirmEmail}</span>
          </p>
        )}

        <label htmlFor="zipCode">Zip Code:</label>
        <input
          name="zipCode"
          id="zipCode"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e, true);
          }}
        />
        {errors.zipCode && (
          <p className="error">
            <span data-testid="zip-code-error">{errors.zipCode}</span>
          </p>
        )}

        <h4>Take a picture of something you painted </h4>
        <input
          type="file"
          name="uploadPhoto"
          onChange={(e) => {
            handleFileChange(e);
            setField(e);
          }}
        />

        <ThirdColorProvider>
          <h4>
            You can also use the
            <ToggleContent
              toggle={(show: () => void) => (
                <span
                  className="emphasize-on-hover"
                  onClick={(e) => {
                    show();
                  }}
                >
                  color picker
                </span>
              )}
              content={(hide: () => void) => (
                <Modal>
                  <ColorPicker onColorChosen={onColorSelected} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      hide();
                    }}
                  >
                    Close
                  </button>
                </Modal>
              )}
            />
          </h4>
          <ToggleContent
            toggle={(show: () => void) => (
              <p>
                <RgbIcon
                  onClick={(e) => {
                    show();
                  }}
                ></RgbIcon>
                <RgbDisplay onColorChosen={onColorSelected} />
              </p>
            )}
            content={(hide: () => void) => (
              <Modal>
                <ColorPicker onColorChosen={onColorSelected} />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    hide();
                  }}
                >
                  Close
                </button>
              </Modal>
            )}
          />
        </ThirdColorProvider>
        {errors.atLeastOne && (
          <p className="error">
            <span data-testid="confirm-email-error">{errors.atLeastOne}</span>
          </p>
        )}

        <p>
          <label htmlFor="save" className="hidden">
            {" "}
            post your paint{" "}
          </label>
          <input type="submit" value="save" id="save" />
        </p>

        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/roundicons"
            title="Roundicons"
          >
            Roundicons
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GiveAwayPaint;
