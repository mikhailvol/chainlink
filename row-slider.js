function runScriptIfScreenSizeIsBigEnough() {
    if (window.innerWidth > 991) {
        const containers = document.getElementsByClassName("temp-row w-dyn-items");

        const hideCards = (container, start) => {
            const cards = container.getElementsByClassName('w-dyn-item');
            for( let i = start; i < cards.length; i++ ){
                cards[i].style.display = 'none';
            }
        }

        const showCards= (container) => {
            const cards = container.getElementsByClassName('w-dyn-item');
            for( let i = 0; i < cards.length; i++ ){
                cards[i].style.display = 'flex';
            }
        }

        const transform = (container, value) => {
            $(container).animate(
                { transformValue: value }, 
                {
                    duration: 300,
                    step: function(now, tween) {
                        if (tween.prop === "transformValue") {
                            $(this).css('transform','translateX('+now+'px)');  
                        }
                    }
                }
            );
        }

        const reevaluateVariables = (i) => {
            const container = document.getElementsByClassName("temp-row w-dyn-items")[i];
            const parentContainer = container.closest(".temp-block");
            const visibleWidth = container.clientWidth;
            const scrollWidth = container.scrollWidth;
            const widthMultiplier = Math.ceil(scrollWidth/visibleWidth);
            const totalWidth = widthMultiplier * visibleWidth;
            return {
                container,
                visibleWidth,
                scrollWidth,
                widthMultiplier,
                totalWidth,
                parentContainer,
                leftArrow: parentContainer.getElementsByClassName("card-slider-prev")[0],
                rightArrow: parentContainer.getElementsByClassName("card-slider-next")[0],
                seeAllCard: parentContainer.getElementsByClassName('see-all-col')[0],
                documentAllCard: parentContainer.getElementsByClassName('docs-col')[0]
            }
        };

        let handleSlider = () => {
            for( let i = 0; i < containers.length; i++ ){
                // All variables
                let variables = reevaluateVariables(i);
                // we need to reset this in case it the logic has been retriggered by filter
                if( variables.seeAllCard ) {
                    variables.seeAllCard.style.display = 'none';
                }
                showCards(variables.container);
                transform(variables.container, 0);
                variables.leftArrow.style.display = 'inline-block';
                variables.rightArrow.style.display = 'inline-block';
                variables = reevaluateVariables(i);

                // Move Document card if needed
                if( variables.documentAllCard ) {
                    variables.container.prepend(variables.documentAllCard);
                    variables.documentAllCard.style.display = 'flex';
                    hideCards(variables.container, 10);
                } else {
                    hideCards(variables.container, 11);
                }
                variables = reevaluateVariables(i);

                // It covers more than one line
                const requireScrolling = variables.totalWidth > variables.visibleWidth;
                
                // Hide buttons if less than 4 cards
                if( !requireScrolling ) {
                    variables.leftArrow.style.display = 'none';
                    variables.rightArrow.style.display = 'none';
                }

                // Move See all card if needed
                if( requireScrolling && variables.seeAllCard ) {
                    variables.container.appendChild(variables.seeAllCard);
                    variables.seeAllCard.style.display = 'flex';
                    variables = reevaluateVariables(i);
                }

                // Apply moving script
                const scrollRight = function() {
                    transformStyle = variables.container.style.transform || "0";
                    const currentTransform = transformStyle.replace(/[^-?\d.]/g, '');
                    const transformSize = Math.min(parseInt(currentTransform) + parseInt(variables.visibleWidth), 0);
                    transform(variables.container, transformSize);
                }
                const scrollLeft = function() {
                    transformStyle = variables.container.style.transform || "0";
                    const currentTransform = transformStyle.replace(/[^-?\d.]/g, '');
                    let transformSize = parseInt(currentTransform) - parseInt(variables.visibleWidth);
                    if( Math.abs(transformSize) >= variables.totalWidth) {
                        transformSize = currentTransform;
                    }
                    transform(variables.container, transformSize);
                }
                variables.leftArrow.removeEventListener("click", scrollRight );
                variables.rightArrow.removeEventListener("click", scrollLeft );
                const leftEvent = variables.leftArrow.addEventListener("click", scrollRight );
                const rightEvent = variables.rightArrow.addEventListener("click", scrollLeft );
            }
        }
        $(document).ready(handleSlider);

        const filtersForSlider = document.getElementsByClassName('filters-container')[0].getElementsByClassName('w-dyn-list');
        for( let i = 0; i < filtersForSlider.length; i++ ){
            const filter = filtersForSlider[i];
            filter.addEventListener("click", () => setTimeout(handleSlider,200) );
        }
    }
}

// Run the script when the document is ready and when the window is resized
document.addEventListener("DOMContentLoaded", runScriptIfScreenSizeIsBigEnough);
window.addEventListener("resize", runScriptIfScreenSizeIsBigEnough);






// const containers = document.getElementsByClassName("temp-row w-dyn-items");

// const hideCards = (container, start) => {
//     const cards = container.getElementsByClassName('w-dyn-item');
//     for( let i = start; i < cards.length; i++ ){
//         cards[i].style.display = 'none';
//     }
// }

// const showCards= (container) => {
//     const cards = container.getElementsByClassName('w-dyn-item');
//     for( let i = 0; i < cards.length; i++ ){
//         cards[i].style.display = 'flex';
//     }
// }

// const transform = (container, value) => {
//     $(container).animate(
//         { transformValue: value }, 
//         {
//             duration: 300,
//             step: function(now, tween) {
//                 if (tween.prop === "transformValue") {
//                     $(this).css('transform','translateX('+now+'px)');  
//                 }
//             }
//         }
//     );
// }

// const reevaluateVariables = (i) => {
//     const container = document.getElementsByClassName("temp-row w-dyn-items")[i];
//     const parentContainer = container.closest(".temp-block");
//     const visibleWidth = container.clientWidth;
//     const scrollWidth = container.scrollWidth;
//     const widthMultiplier = Math.ceil(scrollWidth/visibleWidth);
//     const totalWidth = widthMultiplier * visibleWidth;
//     return {
//         container,
//         visibleWidth,
//         scrollWidth,
//         widthMultiplier,
//         totalWidth,
//         parentContainer,
//         leftArrow: parentContainer.getElementsByClassName("card-slider-prev")[0],
//         rightArrow: parentContainer.getElementsByClassName("card-slider-next")[0],
//         seeAllCard: parentContainer.getElementsByClassName('see-all-col')[0],
//         documentAllCard: parentContainer.getElementsByClassName('docs-col')[0]
//     }
// };
// let handleSlider = () => {
//     for( let i = 0; i < containers.length; i++ ){
//         // All variables
//         let variables = reevaluateVariables(i);
//         // we need to reset this in case it the logic has been retriggered by filter
//         if( variables.seeAllCard ) {
//             variables.seeAllCard.style.display = 'none';
//         }
//         showCards(variables.container);
//         transform(variables.container, 0);
//         variables.leftArrow.style.display = 'inline-block';
//         variables.rightArrow.style.display = 'inline-block';
//         variables = reevaluateVariables(i);
        
//         // Move Document card if needed
//         if( variables.documentAllCard ) {
//             variables.container.prepend(variables.documentAllCard);
//             variables.documentAllCard.style.display = 'flex';
//             hideCards(variables.container, 10);
//         } else {
//             hideCards(variables.container, 11);
//         }
//         variables = reevaluateVariables(i);

//         // It cover more than one line
//         const requireScrolling = variables.totalWidth > variables.visibleWidth;
        
//         // Hide buttons if less than 4 cards
//         if( !requireScrolling ) {
//             variables.leftArrow.style.display = 'none';
//             variables.rightArrow.style.display = 'none';
//         }

//         // Move See all card if needed
//         if( requireScrolling && variables.seeAllCard ) {
//             variables.container.appendChild(variables.seeAllCard);
//             variables.seeAllCard.style.display = 'flex';
//             variables = reevaluateVariables(i);
//         }

//         // Apply moving script
//         const scrollRight = function() {
//             transformStyle = variables.container.style.transform || "0";
//             const currentTransform = transformStyle.replace(/[^-?\d.]/g, '');
//             const transformSize = Math.min(parseInt(currentTransform) + parseInt(variables.visibleWidth), 0);
//             transform(variables.container, transformSize);
//         }
//         const scrollLeft = function() {
//             transformStyle = variables.container.style.transform || "0";
//             const currentTransform = transformStyle.replace(/[^-?\d.]/g, '');
//             let transformSize = parseInt(currentTransform) - parseInt(variables.visibleWidth);
//             if( Math.abs(transformSize) >= variables.totalWidth) {
//                 transformSize = currentTransform;
//             }
//             transform(variables.container, transformSize);
//         }
//         variables.leftArrow.removeEventListener("click", scrollRight );
//         variables.rightArrow.removeEventListener("click", scrollLeft );
//         const leftEvent = variables.leftArrow.addEventListener("click", scrollRight );
//         const rightEvent = variables.rightArrow.addEventListener("click", scrollLeft );
//     }
// }
// $(document).ready(handleSlider);
// const filtersForSlider = document.getElementsByClassName('filters-container')[0].getElementsByClassName('w-dyn-list');
// for( let i = 0; i < filtersForSlider.length; i++ ){
//     const filter = filtersForSlider[i];
//     filter.addEventListener("click", () => setTimeout(handleSlider,200) );
// }