import { Locator, Page, expect } from "@playwright/test";
import { CUSTOMER_PAGE } from '@/constants/customer/page.constant';
import { Sizes, maxWeight } from "@/mocks/ShipmentMock";


class CustomerShipment {
    private page: Page;
    private box: Locator;
    private pouch: Locator;
    private passport: Locator;
    private cargo: Locator;
    private lengthInput: Locator;
    private widthInput: Locator;
    private heightInput: Locator;
    private weightInput: Locator;
    private quantityInput: Locator;

    private smallSize: Locator;
    private mediumSize: Locator;
    private largeSize: Locator;
    private extraLargeSize: Locator;
    private balikBayanSize: Locator;


    private submitButton: Locator;

    readonly smallBoxPrice: Locator;
    readonly mediumSizePrice: Locator;
    readonly largeSizePrice: Locator;
    readonly extraLargeSizePrice: Locator;
    readonly balikBayanSizePrice: Locator;
    readonly lengthError: Locator;
    readonly widthError: Locator;
    readonly heightError: Locator;
    readonly weightError: Locator;
    readonly quantityError: Locator;
    readonly maxWeightError: Locator;




constructor(page: Page) {
    this.page = page;
    this.box = page.getByRole('heading', { name: 'Box' });
    this.pouch = page.getByRole('heading', { name: 'Pouch' });
    this.passport = page.getByRole('heading', { name: 'Passport' });
    this.cargo = page.getByRole('heading', { name: 'Cargo' });
    this.smallSize = page.getByRole('button', { name: 'S', exact: true });
    this.mediumSize = page.getByRole('button', { name: 'M', exact: true });
    this.largeSize = page.getByRole('button', { name: 'L', exact: true });
    this.extraLargeSize = page.getByRole('button', { name: 'XL', exact: true });
    this.balikBayanSize = page.getByRole('button', { name: 'Balikbayan', exact: true });
    this.lengthInput = page.getByRole('spinbutton', { name: 'Length (cm)*' });
    this.widthInput = page.getByRole('spinbutton', { name: 'Width (cm)*' });
    this.heightInput = page.getByRole('spinbutton', { name: 'Height (cm)*' });
    this.weightInput = page.getByRole('spinbutton', { name: 'Weight (kg)*' });
    this.quantityInput = page.getByRole('spinbutton', { name: 'Quantity*' });

    this.smallBoxPrice = page.getByText('₱315.00', { exact: true });
    this.mediumSizePrice = page.getByText('₱363.00', { exact: true });
    this.largeSizePrice = page.getByText('₱483.00', { exact: true });
    this.extraLargeSizePrice = page.getByText('₱1668.00', { exact: true });
    this.balikBayanSizePrice = page.getByText('₱3256.50', { exact: true });

    this.submitButton = page.getByRole('button', { name: /Add Shipment/i });

    this.lengthError = page.locator('text=Length must be at least 1cm');
    this.widthError = page.locator('text=Width must be at least 1cm');
    this.heightError = page.locator('text=Height must be at least 1cm');
    this.weightError = page.locator('text=Expected number, received nan');
    this.quantityError = page.locator('text=Quantity must be at least 1');
    this.maxWeightError = page.locator('text=Weight must not exceeded 10kg');

}


async navigateToCustomerPage(): Promise<void> {
        await this.page.goto(CUSTOMER_PAGE);
    }

async clickBox(): Promise<void> {
        await this.box.click();

    }

async validSmallBoxShipment(): Promise<void> {
        await this.smallSize.waitFor({ state: 'visible' });
        await this.smallSize.click();
        await this.smallBoxPrice.waitFor({ state: 'visible' });
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.page.getByText("Subtotal (1)")).toBeVisible();

};

async validMediumBoxShipment(): Promise<void> {

        await this.mediumSize.waitFor({ state: 'visible' });
        await this.mediumSize.click();
        await this.mediumSizePrice.waitFor({ state: 'visible' });
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.page.getByText("Subtotal (1)")).toBeVisible();

}
async validLargeBoxShipment(): Promise<void> {
        await this.largeSize.waitFor({ state: 'visible' });
        await this.largeSize.click();
        await this.largeSizePrice.waitFor({ state: 'visible' });
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.page.getByText("Subtotal (1)")).toBeVisible();

    }
async validExtraLargeBoxShipment(): Promise<void> {
        await this.extraLargeSize.waitFor({ state: 'visible' });
        await this.extraLargeSize.click();
        await this.extraLargeSize.click();
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.page.getByText("Subtotal (1)")).toBeVisible();

    }
async validBalikBayanBoxShipment(): Promise<void> {
        await this.balikBayanSize.waitFor({ state: 'visible' });
        await this.balikBayanSize.click();
        await this.balikBayanSizePrice.waitFor({ state: 'visible' });
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.page.getByText("Subtotal (1)")).toBeVisible();

    }

async emptyBoxShipment(): Promise<void> {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        await expect(this.lengthError).toBeVisible();
        await expect(this.widthError).toBeVisible();
        await expect(this.heightError).toBeVisible();
        await expect(this.weightError).toBeVisible();

    }



async fillSizes(length: string, width: string, height: string, weight: string, quantity: string): Promise<void> {

        await this.lengthInput.fill(length);
        await this.widthInput.fill(width);
        await this.heightInput.fill(height);
        await this.weightInput.fill(weight);
        await this.quantityInput.fill(quantity);
    }

async emptyLengthShipment(): Promise<void> {
        await this.widthInput.fill(Sizes.width);
        await this.heightInput.fill(Sizes.height);
        await this.weightInput.fill(Sizes.weight);

        await this.submitButton.click();
        await expect(this.lengthError).toBeVisible();
        
    }

async emptyWidthShipment(): Promise<void> {
        await this.lengthInput.fill(Sizes.length);
        await this.heightInput.fill(Sizes.height);
        await this.weightInput.fill(Sizes.weight);

        await this.submitButton.click();
        await expect(this.widthError).toBeVisible();
    }
async emptyHeightShipment(): Promise<void> {
        await this.lengthInput.fill(Sizes.length);
        await this.widthInput.fill(Sizes.width);
        await this.weightInput.fill(Sizes.weight);

        await this.submitButton.click();
        await expect(this.heightError).toBeVisible();
    }
async emptyWeightShipment(): Promise<void> {
        await this.lengthInput.fill(Sizes.length);
        await this.widthInput.fill(Sizes.width);
        await this.heightInput.fill(Sizes.height);
 
        await this.submitButton.click();
        await expect(this.weightError).toBeVisible();
    }
async emptyQuantityShipment(): Promise<void> {
        await this.lengthInput.fill(Sizes.length);
        await this.widthInput.fill(Sizes.width);
        await this.heightInput.fill(Sizes.height);
        await this.weightInput.fill(Sizes.weight);
        await this.quantityInput.fill(Sizes.quantity);

        await this.submitButton.click();
        await expect(this.quantityError).toBeVisible();
    }
async maxWeightShipment(): Promise<void> {
        await this.lengthInput.fill(Sizes.length);
        await this.widthInput.fill(Sizes.width);
        await this.heightInput.fill(Sizes.height);
        await this.weightInput.fill(maxWeight.weight);

        await this.submitButton.click();
        await expect(this.maxWeightError).toBeVisible();
    }


async clickPouch(): Promise<void> {
            await this.pouch.click();
        }
async clickPassport(): Promise<void> {
            await this.passport.click();
        }
 async clickCargo(): Promise<void> {
            await this.cargo.click();
        }




};

export default CustomerShipment;
