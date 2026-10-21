// Results-only fixture entry points. Reuse the comparison and offer interactions.
const demoProduct=PRODUCT_INDEX.find(product=>product.name==='iPhone 17');
const demoVariants=demoProduct.variants.map(group=>({label:group.label,value:group.options[0]}));
showIdentified({...demoProduct,selectedVariants:demoVariants,variantLabel:demoVariants.map(variant=>variant.value).join(' · ')});

const layoutsLink=document.createElement('a');
layoutsLink.href='../results/index.html';
layoutsLink.className='results-layouts-link';
layoutsLink.textContent='Results options';
chatHeader.append(layoutsLink);
const changeProduct=pipelineSection.querySelector('.result-intro button');
changeProduct.remove();

if(document.body.dataset.resultsLayout==='recommendation-first'){
  const mainStores=pipelineSection.querySelector('[aria-label="Main stores"]');
  const featured=document.createElement('section');
  featured.className='featured-result';
  featured.setAttribute('aria-label','Recommended store');
  featured.append(mainStores.firstElementChild);
  mainStores.before(featured);
  featured.after(pipelineSection.querySelector('.agent-recommendation'));
  const alternatives=document.createElement('section');
  alternatives.className='results-alternatives';
  alternatives.setAttribute('aria-labelledby','results-alternatives-title');
  const heading=document.createElement('h2');
  heading.id='results-alternatives-title';
  heading.textContent='Other options';
  mainStores.before(alternatives);
  alternatives.append(heading,mainStores);
  mainStores.setAttribute('aria-label','Other options');
  const storeName=featured.querySelector('.store-copy strong').textContent;
  const intro=pipelineSection.querySelector('.result-intro');
  intro.classList.add('assistant-intro');
  const identity=document.createElement('span');
  identity.className='assistant-identity';
  identity.textContent='Agent8';
  const price=mockPrice(demoProduct.name,storeName,demoProduct.category);
  intro.querySelector('p').textContent=storeName+' is the best option here. The gift card brings the total to '+formatINR(price-Math.round(price*.02))+'.';
  intro.prepend(identity);
  const recommendation=pipelineSection.querySelector('.agent-recommendation');
  recommendation.querySelector('h2').remove();
  recommendation.querySelector('p').textContent='Here’s how to get that saving:';
  recommendation.querySelector('ol li:last-child').textContent='Apply the gift card at checkout and place the order.';

  const followup=document.createElement('section');
  followup.className='results-followup';
  followup.setAttribute('aria-label','Continue with Agent8');
  followup.innerHTML='<p class="followup-prompt">Want to check reviews or compare card offers?</p><div class="followup-chips"></div><div class="followup-messages" aria-live="polite" aria-relevant="additions"></div><form class="followup-compose"><label class="sr-only" for="followup-input">Ask Agent8 about this purchase</label><input id="followup-input" placeholder="Ask a follow-up…" autocomplete="off"><button type="submit" aria-label="Send message">↑</button></form>';
  const replies={
    'What do reviews say?':'Verified reviews aren’t available in this preview yet. A review summary would cover the product’s strengths, common complaints and whether it suits the intended use.',
    'Compare card offers':'The HDFC Tata Neu offer returns ₹878 in NeuCoins. The Amazon Pay ICICI offer returns ₹586 in cashback. The Flipkart gift card saves ₹1,171 upfront, which is the lowest-cost option here.',
    'How do these savings work?':'The product costs ₹58,550. A gift card worth the same amount costs ₹57,379 after the 2% discount. Redeeming it covers the order and saves ₹1,171. The direct card reward can’t be added to that saving.'
  };
  const input=followup.querySelector('input');
  const messages=followup.querySelector('.followup-messages');
  function continueChat(question){
    const prompt=document.createElement('p');prompt.className='followup-question';prompt.textContent=question;
    const reply=document.createElement('p');reply.className='followup-reply';
    reply.textContent=replies[question]||(/review/i.test(question)?replies['What do reviews say?']:/card|credit|neu|cashback/i.test(question)?replies['Compare card offers']:/sav|gift|price|cost/i.test(question)?replies['How do these savings work?']:'This preview has sample answers about savings, card offers and reviews. Choose a suggestion above to explore one.');
    const turn=document.createElement('div');turn.className='followup-assistant-turn';
    const speaker=document.createElement('span');speaker.className='assistant-identity';speaker.textContent='Agent8';
    turn.append(speaker,reply);
    messages.append(prompt,turn);
    input.value='';input.focus();
    // The input lives in the bottom dock, so bring the new answer into view above it.
    turn.scrollIntoView({block:'end'});
  }
  Object.keys(replies).forEach(question=>{
    const chip=document.createElement('button');chip.type='button';chip.textContent=question;
    chip.onclick=()=>continueChat(question);
    followup.querySelector('.followup-chips').append(chip);
  });
  followup.querySelector('form').onsubmit=event=>{event.preventDefault();const question=input.value.trim();if(question)continueChat(question)};
  pipelineSection.append(followup);
  const chatDock=document.createElement('div');
  chatDock.className='followup-chat-dock';
  chatDock.append(followup.querySelector('form'));
  document.body.append(chatDock);
}
